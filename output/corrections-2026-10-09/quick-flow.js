async (page) => {
  await page.getByRole('radio', { name: /Dieta rápida/i }).click();
  await page.getByLabel('Peso atual (kg)').fill('15');
  await page.getByRole('radio', { name: /^Castrado$/ }).click();
  await page.getByRole('button', { name: 'Próximo: Energia' }).click();
  return { url: page.url(), tail: (await page.locator('body').innerText()).slice(-1500), inputs: await page.locator('input').evaluateAll(items => items.map(x => ({id:x.id,value:x.value}))) };
}
