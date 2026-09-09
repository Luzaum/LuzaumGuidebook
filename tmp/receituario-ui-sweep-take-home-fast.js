async page => {
  await page.goto('http://localhost:5188/tmp/receituario-review.html');
  const menu = page.getByRole('combobox', { name: 'Modelo', exact: true });
  await menu.waitFor({ state: 'visible', timeout: 45000 });
  const entries = await menu.locator('option').evaluateAll(options => options.map(option => ({ id: option.value, title: option.textContent || '' })));
  const results = [];
  for (const entry of entries) {
    await menu.selectOption(entry.id);
    const isCat = /gat|felin/i.test(entry.title);
    await page.getByRole('combobox', { name: 'Espécie', exact: true }).selectOption(isCat ? 'gato' : 'cão');
    await page.getByRole('textbox', { name: 'Peso', exact: true }).fill(isCat ? '4' : '10');
    const region = page.getByRole('region', { name: 'Configuração clínica do modelo' });
    const buttons = region.getByRole('button');
    const optionCount = await buttons.count();
    const cases = [];
    for (let index = 0; index < optionCount; index += 1) {
      const states = await buttons.evaluateAll(nodes => nodes.map((node, i) => ({ i, pressed: node.getAttribute('aria-pressed') === 'true' })));
      for (const state of states.filter(item => item.pressed)) await buttons.nth(state.i).click({ force: true });
      const button = buttons.nth(index);
      const option = (await button.innerText()).replace(/\s+/g, ' ').trim();
      if (await button.isEnabled()) await button.click({ force: true });
      await page.waitForTimeout(300);
      const body = await page.locator('.receituario-a4-wrapper').innerText();
      cases.push({
        option,
        placeholder: /A PREENCHER|APRESENTAÇÃO A SELECIONAR|ERRO DE DOSE/.test(body),
        invalidNumber: /\bNaN\b|\bInfinity\b/.test(body),
      });
    }
    results.push({ id: entry.id, title: entry.title, optionCount, cases });
  }
  return {
    scope: 'Todos os modelos e todas as opções nos componentes reais isolados, com pacientes fictícios e sem emissão',
    models: results.length,
    options: results.reduce((sum, item) => sum + item.optionCount, 0),
    problems: results.flatMap(item => item.cases.filter(test => test.placeholder || test.invalidNumber).map(test => ({ model: item.title, ...test }))),
    results,
  };
}



