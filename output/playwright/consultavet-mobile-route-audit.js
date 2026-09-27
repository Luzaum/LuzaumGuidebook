async (page) => {
  const baseUrl = 'http://127.0.0.1:5173';
  const routes = [
    '/consulta-vet',
    '/consulta-vet/doencas',
    '/consulta-vet/doencas/cistite-idiopatica-felina',
    '/consulta-vet/medicamentos',
    '/consulta-vet/medicamentos/fenobarbital',
    '/consulta-vet/apresentacoes-comerciais',
    '/consulta-vet/receituario',
    '/consulta-vet/manejo-emergencial',
    '/consulta-vet/manejo-emergencial/cetoacidose-diabetica',
    '/consulta-vet/guias-rapidos',
    '/consulta-vet/guias-rapidos/biopsia-incisional-caes-gatos',
    '/consulta-vet/referencias-rapidas',
    '/consulta-vet/referencias-rapidas/oncologia',
    '/consulta-vet/referencias-rapidas/vhs',
    '/consulta-vet/referencias-rapidas/ultrassom',
    '/consulta-vet/consensos',
    '/consulta-vet/consensos/leishmaniose-brasileiro-2020',
    '/consulta-vet/consensos/hipertensao-sistemica',
    '/consulta-vet/favoritos',
    '/consulta-vet/recentes',
    '/consulta-vet/categorias',
    '/consulta-vet/categorias/cardiologia',
  ];

  await page.setViewportSize({ width: 390, height: 844 });
  const report = [];

  for (const route of routes) {
    const startedAt = Date.now();
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    await page.waitForTimeout(1_500);

    const metrics = await page.evaluate(() => {
      const isVisible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          Number(style.opacity || 1) > 0 &&
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < innerHeight
        );
      };

      const controls = Array.from(
        document.querySelectorAll('button, input, select, textarea, [role="button"]')
      )
        .filter(isVisible)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            label:
              element.getAttribute('aria-label') ||
              element.getAttribute('title') ||
              element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) ||
              element.tagName,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        });

      const tinyControls = controls.filter((control) => control.width < 40 || control.height < 40);
      const clipped = Array.from(document.querySelectorAll('main *'))
        .filter(isVisible)
        .filter((element) => {
          const style = getComputedStyle(element);
          return (
            ['hidden', 'clip'].includes(style.overflow) &&
            (element.scrollWidth > element.clientWidth + 2 || element.scrollHeight > element.clientHeight + 2)
          );
        })
        .slice(0, 12)
        .map((element) => ({
          tag: element.tagName,
          text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) || '',
          client: [element.clientWidth, element.clientHeight],
          scroll: [element.scrollWidth, element.scrollHeight],
          className: String(element.className || '').slice(0, 180),
        }));

      const brokenImages = Array.from(document.images)
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => ({ src: image.currentSrc || image.src, alt: image.alt }));

      const mains = Array.from(document.querySelectorAll('main')).map((element) => ({
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        clientHeight: element.clientHeight,
        scrollHeight: element.scrollHeight,
      }));

      const pdfCanvas = document.querySelector('.react-pdf__Page canvas');
      const pdfViewer = pdfCanvas?.closest('.react-pdf__Document')?.parentElement?.parentElement;

      return {
        h1: Array.from(document.querySelectorAll('h1')).map((element) => element.textContent?.trim()),
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
        bodyTextPrefix: document.body.innerText.trim().replace(/\s+/g, ' ').slice(0, 180),
        mains,
        controls: controls.length,
        tinyControls,
        clipped,
        brokenImages,
        pdf: pdfCanvas
          ? {
              canvasCssWidth: Math.round(pdfCanvas.getBoundingClientRect().width),
              canvasCssHeight: Math.round(pdfCanvas.getBoundingClientRect().height),
              viewerClientWidth: pdfViewer?.clientWidth || null,
              viewerScrollWidth: pdfViewer?.scrollWidth || null,
            }
          : null,
        pdfError: document.body.innerText.includes('Não foi possível carregar o PDF'),
        notFound: /não encontrad[oa]/i.test(document.body.innerText),
      };
    });

    report.push({ route, durationMs: Date.now() - startedAt, ...metrics });
  }

  return report;
}
