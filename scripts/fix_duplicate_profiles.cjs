const fs = require('fs');
const path = require('path');

const drugsDir = path.join(__dirname, '../modules/crivet/data/drugs');

const mappings = [
    { oldName: 'dexmedetomidine', newName: 'dexmedetomidina', newId: 'dexmedetomidina' },
    { oldName: 'dobutamine', newName: 'dobutamina', newId: 'dobutamina' },
    { oldName: 'ephedrine', newName: 'efedrina', newId: 'efedrina' },
    { oldName: 'fentanyl', newName: 'fentanil', newId: 'fentanil' },
    { oldName: 'insulinRegular', newName: 'insulina_regular', newId: 'insulina_regular' },
    { oldName: 'ketamine', newName: 'cetamina', newId: 'cetamina' },
    { oldName: 'lidocaine', newName: 'lidocaina', newId: 'lidocaina' },
    { oldName: 'methadone', newName: 'metadona', newId: 'metadona' },
    { oldName: 'norepinephrine', newName: 'norepinefrina', newId: 'norepinefrina' },
];

mappings.forEach(map => {
    const oldPath = path.join(drugsDir, `${map.oldName}.profile.ts`);
    const newPath = path.join(drugsDir, `${map.newName}.profile.ts`);

    if (fs.existsSync(oldPath)) {
        console.log(`Migrando ${map.oldName} para ${map.newName}...`);

        let content = fs.readFileSync(oldPath, 'utf8');

        // Atualizar o ID dentro do arquivo
        // Procura por drug_id: '...'
        content = content.replace(/drug_id:\s*'[^']+'/, `drug_id: '${map.newId}'`);

        // Atualizar o nome da constante exportada
        // ex: export const fentanylProfile = ...
        // para: export const fentanilProfile = ...
        const oldVarName = `${map.oldName.replace(/-./g, x => x[1].toUpperCase())}Profile`; // camelCase aproximado
        // A regex abaixo tenta pegar o nome da variável exportada
        const varRegex = new RegExp(`export const ${map.oldName}Profile`, 'g');
        const newVarName = `${map.newName.replace(/-./g, x => x[1].toUpperCase())}Profile`;

        // Tentar substituir o nome da variável se bater com o padrão esperado
        if (content.match(varRegex)) {
            content = content.replace(varRegex, `export const ${newVarName}`);
        } else {
            // Se não bater, pode ser que o nome da variavel seja diferente, vamos tentar ser mais genericos ou apenas avisar
            // Mas geralmente segue o padrão <name>Profile
            console.log(`⚠️ Aviso: Não encontrei 'export const ${map.oldName}Profile'. Verifique a variável exportada em ${map.newName}.profile.ts`);
            // Tentar regex mais generico para pegar qualquer export const ...Profile
            content = content.replace(/export const \w+Profile/g, `export const ${newVarName}`);
        }

        fs.writeFileSync(newPath, content);
        console.log(`✅ ${map.newName}.profile.ts atualizado com dados ricos.`);

        // Deletar antigo? Melhor renomear para .bak por segurança
        fs.renameSync(oldPath, oldPath + '.bak');

        // Também migrar arquivos satélites se houver (.compat.ts, .presets.ts)
        ['compat', 'presets'].forEach(suffix => {
            const satelliteOld = path.join(drugsDir, `${map.oldName}.${suffix}.ts`);
            const satelliteNew = path.join(drugsDir, `${map.newName}.${suffix}.ts`);
            if (fs.existsSync(satelliteOld)) {
                fs.renameSync(satelliteOld, satelliteNew); // rename é seguro aqui
                console.log(`  Mudei ${map.oldName}.${suffix}.ts para ${map.newName}.${suffix}.ts`);
            }
        });

    } else {
        console.log(`Pulei ${map.oldName}: arquivo original não encontrado.`);
    }
});

console.log('Migração de nomes concluída.');
