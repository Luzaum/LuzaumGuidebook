#!/usr/bin/env node

/**
 * Quality Gate: Validate Supabase Payloads
 * 
 * This script scans the src/ directory for patterns like .insert({, .update({, .upsert({
 * extracts keys from inline object literals, and compares them against whitelists
 * in src/lib/clinicRecords.ts to prevent PGRST204 errors.
 * 
 * Usage: npm run validate:dbpayloads
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Whitelists from clinicRecords.ts
const MEDICATION_ALLOWED_FIELDS = [
    'id',
    'clinic_id',
    'created_by',
    'owner_user_id',
    'is_private',
    'name',
    'notes',
    'is_controlled',
    'species',
    'routes',
    'is_active',
    'metadata',
    'created_at',
    'updated_at',
];

const PRESENTATION_ALLOWED_FIELDS = [
    'id',
    'clinic_id',
    'medication_id',
    'pharmaceutical_form',
    'concentration_text',
    'additional_component',
    'presentation_unit',
    'commercial_name',
    'value',
    'value_unit',
    'per_value',
    'per_unit',
    'avg_price_brl',
    'pharmacy_veterinary',
    'pharmacy_human',
    'pharmacy_compounding',
    'metadata',
    'created_at',
    'updated_at',
];

// Table to whitelist mapping
const TABLE_WHITELISTS: Record<string, string[]> = {
    'medications': MEDICATION_ALLOWED_FIELDS,
    'medication_presentations': PRESENTATION_ALLOWED_FIELDS,
    'tutors': [
        'id', 'clinic_id', 'full_name', 'phone', 'email', 'document_id', 'cpf', 'rg',
        'street', 'number', 'neighborhood', 'city', 'state', 'zipcode', 'address_complement',
        'notes', 'created_at', 'updated_at', 'deleted_at'
    ],
    'patients': [
        'id', 'clinic_id', 'tutor_id', 'name', 'species', 'breed', 'sex', 'neutered',
        'age_text', 'weight_kg', 'coat', 'microchipped', 'anamnesis', 'notes',
        'created_at', 'updated_at', 'deleted_at'
    ],
    'patient_weights': [
        'id', 'clinic_id', 'patient_id', 'weight_kg', 'measured_at', 'notes',
        'created_at', 'updated_at'
    ],
    'protocols': [
        'id', 'clinic_id', 'owner_user_id', 'folder_id', 'name', 'description',
        'target_species', 'is_active', 'created_at', 'updated_at'
    ],
    'protocol_medications': [
        'id', 'clinic_id', 'protocol_id', 'medication_id', 'medication_name',
        'presentation_id', 'presentation_text', 'manual_medication_name',
        'manual_presentation_text', 'concentration_text', 'value', 'value_unit',
        'per_value', 'per_unit', 'route', 'frequency_type', 'times_per_day',
        'interval_hours', 'duration_days', 'instructions', 'sort_order',
        'created_at', 'updated_at'
    ],
    'protocol_recommendations': [
        'id', 'clinic_id', 'protocol_id', 'recommendation_text', 'sort_order',
        'created_at', 'updated_at'
    ],
    'protocol_exam_items': [
        'id', 'clinic_id', 'protocol_id', 'exam_key', 'exam_label', 'is_custom',
        'justification', 'created_at', 'updated_at'
    ],
};

interface ValidationError {
    file: string;
    line: number;
    table: string;
    invalidFields: string[];
    context: string;
}

interface ValidationResult {
    errors: ValidationError[];
    skipped: number;
    totalFiles: number;
}

/**
 * Extract table name from a Supabase query pattern
 */
function extractTableName(line: string): string | null {
    // Patterns: .from('table_name'), .from("table_name"), .from(`table_name`)
    const fromMatch = line.match(/\.from\(['"`]([^'"`]+)['"`]\)/);
    if (fromMatch) {
        return fromMatch[1];
    }

    // Also check for .from(\`table_name\`) with backticks
    const backtickMatch = line.match(/\.from\(`([^`]+)`\)/);
    if (backtickMatch) {
        return backtickMatch[1];
    }

    return null;
}

/**
 * Extract object literal keys from a line
 */
function extractKeysFromObjectLiteral(line: string): string[] {
    const keys: string[] = [];

    // Simple regex to find key: value patterns
    // This is a simplified approach - for production use a proper parser
    const keyValueRegex = /(\w+)\s*:/g;
    let match;

    while ((match = keyValueRegex.exec(line)) !== null) {
        const key = match[1];
        // Skip common TypeScript/JavaScript keywords
        if (!['function', 'const', 'let', 'var', 'if', 'else', 'return', 'typeof'].includes(key)) {
            keys.push(key);
        }
    }

    return keys;
}

/**
 * Validate a TypeScript/JavaScript file
 */
function validateFile(filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    let currentTable: string | null = null;
    let inInsertUpdateBlock = false;
    let blockStartLine = 0;
    let blockLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Look for .insert({, .update({, .upsert({
        const insertUpdateMatch = trimmedLine.match(/\.(insert|update|upsert)\(\s*\{/);
        if (insertUpdateMatch && currentTable) {
            inInsertUpdateBlock = true;
            blockStartLine = i + 1; // 1-based line numbers
            blockLines = [trimmedLine];
            continue;
        }

        // If we're in an insert/update block, collect lines until we find the closing }
        if (inInsertUpdateBlock) {
            blockLines.push(trimmedLine);

            // Check if this line closes the object
            if (trimmedLine.includes('})') || trimmedLine.includes('};') || trimmedLine.includes('},')) {
                // Process the collected block
                const blockText = blockLines.join(' ');
                const keys = extractKeysFromObjectLiteral(blockText);

                if (keys.length > 0 && currentTable && TABLE_WHITELISTS[currentTable]) {
                    const whitelist = TABLE_WHITELISTS[currentTable];
                    const invalidFields = keys.filter(key => !whitelist.includes(key));

                    if (invalidFields.length > 0) {
                        errors.push({
                            file: filePath,
                            line: blockStartLine,
                            table: currentTable,
                            invalidFields,
                            context: blockLines.slice(0, 3).join(' ') + '...'
                        });
                    }
                }

                // Reset for next block
                inInsertUpdateBlock = false;
                blockLines = [];
            }
            continue;
        }

        // Look for .from('table_name') patterns to set current table
        const tableName = extractTableName(trimmedLine);
        if (tableName && TABLE_WHITELISTS[tableName]) {
            currentTable = tableName;
        } else if (tableName && !TABLE_WHITELISTS[tableName]) {
            // Table not in whitelist - skip validation for this table
            currentTable = null;
        }

        // Reset current table if we see a new query chain starting
        if (trimmedLine.startsWith('const') || trimmedLine.startsWith('let') || trimmedLine.startsWith('var')) {
            currentTable = null;
        }
    }

    return errors;
}

/**
 * Main validation function
 */
async function validateSupabasePayloads(): Promise<ValidationResult> {
    console.log('🔍 Validating Supabase payloads...');

    const srcDir = path.join(process.cwd(), 'src');
    const files = await glob('**/*.{ts,tsx,js,jsx}', { cwd: srcDir, absolute: true });

    const result: ValidationResult = {
        errors: [],
        skipped: 0,
        totalFiles: files.length
    };

    for (const file of files) {
        try {
            const errors = validateFile(file);
            result.errors.push(...errors);
        } catch (error) {
            console.warn(`⚠️  Skipping ${path.relative(process.cwd(), file)}: ${error}`);
            result.skipped++;
        }
    }

    return result;
}

/**
 * Format and display validation results
 */
function displayResults(result: ValidationResult): void {
    console.log(`\n📊 Validation Results:`);
    console.log(`   Files scanned: ${result.totalFiles}`);
    console.log(`   Files skipped: ${result.skipped}`);
    console.log(`   Errors found: ${result.errors.length}`);

    if (result.errors.length === 0) {
        console.log('\n✅ All Supabase payloads are valid!');
        process.exit(0);
    }

    console.log('\n❌ Validation errors found:');

    for (const error of result.errors) {
        const relativePath = path.relative(process.cwd(), error.file);
        console.log(`\n   File: ${relativePath}:${error.line}`);
        console.log(`   Table: ${error.table}`);
        console.log(`   Invalid fields: ${error.invalidFields.join(', ')}`);
        console.log(`   Context: ${error.context}`);
        console.log(`   Allowed fields: ${TABLE_WHITELISTS[error.table]?.join(', ') || 'Unknown table'}`);
    }

    console.log('\n💡 Recommendation:');
    console.log('   - Update the payload to only include whitelisted fields');
    console.log('   - Or add the missing fields to the whitelist in clinicRecords.ts');
    console.log('   - Use pickMedicationFields() or pickPresentationFields() helper functions');

    process.exit(1);
}

// Run validation if this script is executed directly
if (require.main === module) {
    validateSupabasePayloads()
        .then(displayResults)
        .catch(error => {
            console.error('❌ Validation failed:', error);
            process.exit(1);
        });
}

export { validateSupabasePayloads, TABLE_WHITELISTS };