async page => {
  const models = [
    { title: 'Asma felina', weight: '4' },
    { title: 'Colapso de traqueia — Cão', weight: '10' },
    { title: 'Pancreatite — Cão (após estabilização)', weight: '10' },
    { title: 'Tríade felina — tratamento individualizado', weight: '4' },
  ];
  const results = [];
  for (const model of models) {
    await page.goto('http://localhost:5173/consulta-vet/receituario');
    const search = page.getByRole('textbox', { name: 'Doença, condição ou medicamento...' });
    await search.waitFor({ state: 'visible', timeout: 45000 });
    await search.fill(model.title);
    const card = page.getByRole('article').filter({ hasText: model.title }).first();
    await card.getByRole('button', { name: 'Usar modelo' }).click();
    await page.getByRole('textbox', { name: /Peso do paciente em quilogramas/ }).fill(model.weight);
    await page.getByRole('button', { name: 'Calcular e abrir receita' }).click();
    const region = page.getByRole('region', { name: 'Configuração clínica do modelo' });
    const optionButtons = region.getByRole('button');
    const optionCount = await optionButtons.count();
    const cases = [];
    for (let index = 0; index < optionCount; index += 1) {
      for (let pressed = (await optionButtons.evaluateAll(nodes => nodes.map((node, i) => ({ i, pressed: node.getAttribute('aria-pressed') === 'true' })))).filter(item => item.pressed); pressed.length; pressed = []) {
        for (const item of pressed) await optionButtons.nth(item.i).click();
      }
      const button = optionButtons.nth(index);
      const name = (await button.innerText()).replace(/\s+/g, ' ').trim();
      await button.click();
      const body = await page.getByRole('textbox', { name: 'Corpo editável do documento' }).inputValue();
      cases.push({
        option: name,
        doseError: /ERRO DE DOSE|NaN|Infinity/i.test(body),
        placeholders: (body.match(/A PREENCHER/g) || []).length,
        medicationLines: body.split('\n').filter(line => /^\d+\.\s/.test(line)),
      });
    }
    const finalBody = await page.getByRole('textbox', { name: 'Corpo editável do documento' }).inputValue();
    results.push({
      ...model,
      optionCount,
      cases,
      finalDoseError: /ERRO DE DOSE|NaN|Infinity/i.test(finalBody),
      finalPlaceholders: (finalBody.match(/A PREENCHER/g) || []).length,
      finalMedicationLines: finalBody.split('\n').filter(line => /^\d+\.\s/.test(line)),
    });
  }
  return { scope: 'Fluxo autenticado real; modelos abertos com pacientes fictícios e sem emissão', results };
}
