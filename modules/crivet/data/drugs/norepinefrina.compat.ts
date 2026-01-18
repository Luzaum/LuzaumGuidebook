export const norepinephrineCompatibility = {
  compatibleDiluent: ['Glicose 5% (SG5%)', 'NaCl 0,9%', 'Ringer Lactato'],
  compatibleMeds: ['Propofol (via Y)', 'Fentanil (via Y)', 'Remifentanil (via Y)'],
  incompatibilities: [
    {
      drug: 'Bicarbonato de sódio',
      why: 'Incompatibilidade absoluta: inativação imediata da norepinefrina em meio alcalino. Não misturar na mesma bolsa ou Y-site.',
      severity: 'critical' as const,
    },
    {
      drug: 'Aminofilina',
      why: 'Incompatibilidade físico-química. Evitar Y-site ou mesma bolsa.',
      severity: 'critical' as const,
    },
    {
      drug: 'Insulina',
      why: 'Incompatibilidade físico-química. Evitar Y-site ou mesma bolsa.',
      severity: 'critical' as const,
    },
    {
      drug: 'Sangue / Hemoderivados',
      why: 'Incompatibilidade físico-química. Evitar Y-site ou mesma bolsa.',
      severity: 'critical' as const,
    },
    {
      drug: 'Soluções alcalinas',
      why: 'Norepinefrina oxida facilmente em meio alcalino. Verificar pH de soluções antes de misturar.',
      severity: 'warning' as const,
    },
  ],
  materialWarnings:
    'Norepinefrina oxida facilmente, especialmente em meio alcalino. Meios ácidos (Glicose 5%) protegem a molécula. Em SF 0,9%, perda de potência mais rápida - trocar em até 12–24h.',
  practicalWarnings: [
    'Diluente preferencial: Glicose 5% (SG5%) - pH levemente ácido protege a molécula.',
    'Em SF 0,9%: trocar solução em até 12–24h devido à estabilidade reduzida.',
    'Preferir cateter venoso central para evitar extravasamento.',
    'Se cateter periférico: usar calibre grosso + via exclusiva.',
    'Extravasamento: infiltrar fentolamina local se disponível.',
    'Nunca administrar sem diluição.',
  ],
}