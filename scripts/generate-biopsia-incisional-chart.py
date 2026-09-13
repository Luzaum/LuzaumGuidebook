"""Original descriptive chart; no pooling of distinct study endpoints."""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 12, 'svg.fonttype': 'none'})
fig, axes = plt.subplots(2, 1, figsize=(9, 7.5), layout='constrained')
fig.patch.set_facecolor('#f8fafc')
for ax, values, title, color in zip(
    axes, [[71, 59], [29, 40.5]],
    ['Concordância com o grau da peça completa', 'Subgraduação em relação à peça completa'],
    ['#0f766e', '#b45309']
):
    ax.set_facecolor('#f8fafc')
    ax.barh(['Central', 'Periférica'], values, color=color, height=.48)
    ax.invert_yaxis()
    ax.set_xlim(0, 100)
    ax.set_xticks([0, 25, 50, 75, 100], ['0%', '25%', '50%', '75%', '100%'])
    ax.set_title(title, loc='left', fontweight='bold', pad=15)
    ax.spines[['top', 'right', 'left']].set_visible(False)
    ax.tick_params(axis='y', length=0)
    ax.set_axisbelow(True)
    ax.grid(axis='x', alpha=.15)
    for i, value in enumerate(values):
        ax.text(value + 1.5, i, str(value).replace('.', ',') + '%', va='center', fontweight='bold', color=color)
fig.suptitle('Uma região nem sempre representa todo o tumor', fontsize=17, fontweight='bold')
fig.supxlabel('Ferraris et al., 2026 • 32 cães • punch após excisão\nDesfechos distintos; não representam sensibilidade universal.', fontsize=10)
target = Path(__file__).resolve().parents[1] / 'public/consulta-vet/clinical-guides/biopsia-incisional/concordancia.svg'
fig.savefig(target)
plt.close(fig)
print(target)
