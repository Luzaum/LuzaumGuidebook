export const remifentanilCompatibility = {
  compatibleDiluent: ['NaCl 0,9% (SF)', 'Ringer Lactato (RL)', 'Glicose 5% (SG 5%)'],
  compatibleMeds: ['Midazolam', 'Propofol (em Y)', 'Dexmedetomidina'],
  incompatibilities: [
    { drug: 'Sangue/hemoderivados', why: 'Não misturar na mesma linha (risco de coagulação).', severity: 'critical' as const },
  ],
  cautions: [
    'Remifentanil é extremamente potente. Sempre usar linha dedicada ou Y próximo ao paciente para evitar dead space.',
    'Em pacientes com hipotensão ou bradicardia, reduzir dose ou considerar opioide alternativo.',
  ],
}
