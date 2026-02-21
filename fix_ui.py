import sys

filepath = r"c:\PROJETOS VET\Vetius\Hemogasometria.tsx"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace global dark mode classes which are undefined in Tailwind config
content = content.replace("dark:bg-card-dark", "dark:bg-[#151b28]")
content = content.replace("dark:border-border-dark", "dark:border-[#334155]")
content = content.replace("dark:bg-input-dark", "dark:bg-[#1e293b]")

# Fix PresetsButtons layout to prevent text squishing/wrapping
old_preset = """const PresetsButtons = ({ param, species, setInputs }) => {
    const handlePreset = (level) => {
        const val = presets[species]?.[param]?.[level];
        if (val !== undefined) setInputs(prev => ({ ...prev, [param]: String(val) }));
    };
    return (
        <div className="flex gap-1 mt-1 justify-end">
            <button type="button" onClick={() => handlePreset('baixo')} className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800 hover:bg-red-200 transition-colors">⬇ Baixo</button>
            <button type="button" onClick={() => handlePreset('normal')} className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded border border-green-200 dark:border-green-800 hover:bg-green-200 transition-colors">✅ Normal</button>
            <button type="button" onClick={() => handlePreset('alto')} className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800 hover:bg-red-200 transition-colors">⬆ Alto</button>
        </div>
    );
};"""

new_preset = """const PresetsButtons = ({ param, species, setInputs }) => {
    const handlePreset = (level) => {
        const val = presets[species]?.[param]?.[level];
        if (val !== undefined) setInputs(prev => ({ ...prev, [param]: String(val) }));
    };
    return (
        <div className="flex w-full gap-1 mt-1.5">
            <button type="button" onClick={() => handlePreset('baixo')} className="flex-1 flex justify-center items-center gap-1 text-[9px] sm:text-[10px] font-bold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 py-1.5 px-0.5 rounded-md border border-red-200 dark:border-red-800 hover:bg-red-200 transition-colors whitespace-nowrap overflow-hidden">
                <span className="material-symbols-outlined text-[12px]">arrow_downward</span><span className="hidden sm:inline">Baixo</span>
            </button>
            <button type="button" onClick={() => handlePreset('normal')} className="flex-1 flex justify-center items-center gap-1 text-[9px] sm:text-[10px] font-bold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 py-1.5 px-0.5 rounded-md border border-green-200 dark:border-green-800 hover:bg-green-200 transition-colors whitespace-nowrap overflow-hidden">
                <span className="material-symbols-outlined text-[12px]">check</span><span className="hidden sm:inline">Normal</span>
            </button>
            <button type="button" onClick={() => handlePreset('alto')} className="flex-1 flex justify-center items-center gap-1 text-[9px] sm:text-[10px] font-bold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 py-1.5 px-0.5 rounded-md border border-red-200 dark:border-red-800 hover:bg-red-200 transition-colors whitespace-nowrap overflow-hidden">
                <span className="material-symbols-outlined text-[12px]">arrow_upward</span><span className="hidden sm:inline">Alto</span>
            </button>
        </div>
    );
};"""

if old_preset in content:
    content = content.replace(old_preset, new_preset)
else:
    print("Could not find old_preset to replace")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Hemo UI fixes applied")
