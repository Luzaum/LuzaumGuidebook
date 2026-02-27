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
import { fileURLToPath } from 'url';
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
        'species', 'duration_summary', 'tags', 'is_control_special', 'exams_justification',
        'created_at', 'updated_at'
    ],
    'protocol_medications': [
        'id', 'clinic_id', 'protocol_id', 'sort_order',
        'medication_id', 'presentation_id',
        'manual_medication_name', 'manual_presentation_label',
        'concentration_value', 'concentration_unit',
        'dose_value', 'dose_unit',
        'route', 'frequency_type', 'times_per_day', 'interval_hours', 'duration_days',
        'is_controlled',
        'created_at', 'updated_at'
    ],
    'protocol_recommendations': [
        'id', 'clinic_id', 'protocol_id', 'text', 'sort_order',
        'created_at', 'updated_at'
    ],
    'protocol_folders': [
        'id', 'clinic_id', 'owner_user_id', 'name', 'icon_key', 'color', 'sort_order',
        'created_at', 'updated_at'
    ],
    'prescriptions': [
        'id', 'clinic_id', 'patient_id', 'tutor_id', 'content', 'status', 'version', 'created_by',
        'pdf_path', 'storage_bucket', 'document_kind', 'pdf_url',
        'created_at', 'updated_at'
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

function extractFirstObjectLiteral(text: string): string {
    const start = text.indexOf('{');
    if (start < 0) return '';
    let depth = 0;
    for (let i = start; i < text.length; i++) {
        const ch = text[i];
        if (ch === '{') depth++;
        if (ch === '}') {
            depth--;
            if (depth === 0) {
                return text.slice(start, i + 1);
            }
        }
    }
    return '';
}

/**
 * Validate a TypeScript/JavaScript file
 */
function validateFile(filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    let currentTable: string | null = null;
    let currentTableLine = -1;
    let inInsertUpdateBlock = false;
    let blockStartLine = 0;
    let blockLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Look for .insert({, .update({, .upsert({
        const insertUpdateMatch = trimmedLine.match(/\.(insert|update|upsert)\(\s*\{/);
        if (insertUpdateMatch && currentTable && currentTableLine >= 0 && i - currentTableLine <= 16) {
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
                const objectText = extractFirstObjectLiteral(blockText);
                const keys = extractKeysFromObjectLiteral(objectText);

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
            currentTableLine = i;
        } else if (tableName && !TABLE_WHITELISTS[tableName]) {
            // Table not in whitelist - skip validation for this table
            currentTable = null;
            currentTableLine = -1;
        }

        // Reset current table if we see a new query chain starting
        if (trimmedLine.startsWith('const') || trimmedLine.startsWith('let') || trimmedLine.startsWith('var')) {
            currentTable = null;
            currentTableLine = -1;
        }
    }

    return errors;
}

/**
 * Main validation function
 */
async function validateSupabasePayloads(): Promise<ValidationResult> {
    console.log('🔍 Validating Supabase payloads...');

    const roots = ['src', 'modules']
        .map((dir) => path.join(process.cwd(), dir))
        .filter((dir) => fs.existsSync(dir));
    const fileLists = await Promise.all(
        roots.map((cwd) => glob('**/*.{ts,tsx,js,jsx}', { cwd, absolute: true }))
    );
    const files = fileLists.flat();

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

// Run validation if this script is executed directly (ESM-safe)
const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isMain) {
    validateSupabasePayloads()
        .then(displayResults)
        .catch(error => {
            console.error('❌ Validation failed:', error);
            process.exit(1);
        });
}

export { validateSupabasePayloads, TABLE_WHITELISTS };
