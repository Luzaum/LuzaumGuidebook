import re

filepath = r"c:\PROJETOS VET\Vetius\Hemogasometria.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Remove old presets object
presets_regex = r"const presets = \{[\s\S]*?^\};\n"
content = re.sub(presets_regex, "", content, flags=re.MULTILINE)

# Replace old PresetsButtons definition
old_preset_regex = r"const PresetsButtons = \(\{ param, species, setInputs \}\) => \{[\s\S]*?^\};"
new_preset = """const QuickAddButtons = ({ param, setInputs, steps }: { param: string, setInputs: any, steps: number[] }) => {
    const handleAdd = (amount: number) => {
        setInputs((prev: any) => {
            const current = parseFloat(prev[param]) || 0;
            const next = current + amount;
            // Limit decimal places to avoid floating point errors
            return { ...prev, [param]: parseFloat(next.toFixed(2)).toString() };
        });
    };
    return (
        <div className="flex w-full gap-1 mt-2 justify-between">
            {steps.map(step => (
                <button 
                  key={step} 
                  type="button" 
                  onClick={() => handleAdd(step)} 
                  className={`flex-1 flex justify-center items-center text-[10px] sm:text-[11px] font-bold py-1.5 px-0.5 rounded-md border transition-all hover:scale-105 active:scale-95 whitespace-nowrap overflow-hidden shadow-sm
                  ${step > 0 
                    ? 'bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40' 
                    : 'bg-rose-50/80 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/40'}`}
                >
                    {step > 0 ? '+' : ''}{step}
                </button>
            ))}
        </div>
    );
};"""

content = re.sub(old_preset_regex, new_preset, content, flags=re.MULTILINE)

# Map param to its specific replacement
replacements = {
    'ph': '<QuickAddButtons param="ph" setInputs={setInputs} steps={[-0.1, -0.01, 0.01, 0.1]} />',
    'pco2': '<QuickAddButtons param="pco2" setInputs={setInputs} steps={[-5, -1, 1, 5]} />',
    'po2': '<QuickAddButtons param="po2" setInputs={setInputs} steps={[-10, -1, 1, 10]} />',
    'hco3': '<QuickAddButtons param="hco3" setInputs={setInputs} steps={[-2, -1, 1, 2]} />',
    'na': '<QuickAddButtons param="na" setInputs={setInputs} steps={[-5, -1, 1, 5]} />',
    'k': '<QuickAddButtons param="k" setInputs={setInputs} steps={[-1, -0.1, 0.1, 1]} />',
    'cl': '<QuickAddButtons param="cl" setInputs={setInputs} steps={[-5, -1, 1, 5]} />',
    'albumin': '<QuickAddButtons param="albumin" setInputs={setInputs} steps={[-1, -0.1, 0.1, 1]} />',
}

for param, new_comp in replacements.items():
    regex = r'<PresetsButtons param="' + param + r'".*?/>'
    content = re.sub(regex, new_comp, content)

# Fix dark mode colors from hex to standard Tailwind semantics to ensure responsiveness
content = content.replace("bg-slate-50 dark:bg-[#1e293b]", "bg-slate-50 dark:bg-slate-800/80")
content = content.replace("bg-slate-50 dark:bg-input-dark", "bg-slate-50 dark:bg-slate-800/80")
content = content.replace("bg-white dark:bg-[#151b28]", "bg-white dark:bg-slate-900")
content = content.replace("bg-white dark:bg-card-dark", "bg-white dark:bg-slate-900")
content = content.replace("dark:border-[#334155]", "dark:border-slate-700")
content = content.replace("dark:border-border-dark", "dark:border-slate-700")

# And add the fade-up animations if not present (to the cards)
content = content.replace('className="bg-white dark:bg-card-dark rounded-xl border', 'className="rxv-card rxv-fade-up bg-white dark:bg-slate-900 rounded-xl border')
content = content.replace('bg-white dark:bg-slate-900 rounded-xl border border-slate-200', 'bg-white dark:bg-slate-900 rounded-xl border border-slate-200 transition-all hover:shadow-lg dark:hover:shadow-black/50 hover:border-blue-400/30 dark:hover:border-blue-500/30')

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Hemogasometria fixed component")
