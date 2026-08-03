import React from 'react';
import type { ReceituarioDocumentData } from '../../types/receituario';
import { displayField, getDocumentSignatureBoxes, paginateDocument } from '../../utils/receituarioDocument';

interface Props { document: ReceituarioDocumentData }

function Identification({ document }: Props) {
  const data = document.identification;
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-1 border-b border-slate-200 pb-4 text-[9.5pt] leading-5">
      <div><dt className="inline font-bold">Paciente: </dt><dd className="inline">{displayField(data.patientName)}</dd></div>
      <div><dt className="inline font-bold">Responsável: </dt><dd className="inline">{displayField(data.responsibleName)}</dd></div>
      <div><dt className="inline font-bold">Espécie: </dt><dd className="inline">{displayField(data.species)}</dd></div>
      <div><dt className="inline font-bold">Raça: </dt><dd className="inline">{displayField(data.breed)}</dd></div>
      <div><dt className="inline font-bold">Sexo: </dt><dd className="inline">{displayField(data.sex)}</dd></div>
      <div><dt className="inline font-bold">Idade / peso: </dt><dd className="inline">{displayField([data.age, data.weightKg ? `${data.weightKg} kg` : ''].filter(Boolean).join(' • '))}</dd></div>
    </dl>
  );
}

export function PrintPreviewA4({ document }: Props) {
  const pages = paginateDocument(document);
  const signatureBoxes = getDocumentSignatureBoxes(document);
  return (
    <div className="receituario-a4-wrapper flex w-full flex-col items-center gap-5 overflow-y-auto bg-slate-200/65 p-3 sm:p-6" data-page-count={pages.length}>
      {pages.map((page) => (
        <article key={page.number} className="receituario-a4-sheet relative flex h-[297mm] w-[210mm] shrink-0 flex-col overflow-hidden bg-white px-[16mm] pb-[13mm] pt-[14mm] font-sans text-slate-900 shadow-xl" data-page-number={page.number}>
          <header className="flex min-h-[22mm] items-start justify-between gap-8 border-b-2 border-slate-900 pb-3">
            <div><p className="text-[15pt] font-bold uppercase tracking-[0.08em]">{displayField(document.header.clinicName)}</p><p className="mt-1 text-[8pt] font-semibold uppercase tracking-[0.16em] text-slate-500">{document.documentType === 'recipe' ? 'Receituário veterinário' : 'Documento veterinário'}</p></div>
            <div className="text-right text-[8.5pt] leading-4"><p className="font-bold">{displayField(document.header.veterinarianName)}</p><p>CRMV: {displayField(document.header.crmv)}</p><p>{displayField(document.header.documentDate)}</p></div>
          </header>
          <div className="pt-4"><h1 className="mb-3 text-center text-[12pt] font-bold uppercase tracking-[0.04em]">{document.title}</h1>{page.number === 1 ? <Identification document={document} /> : null}</div>
          <main className="min-h-0 flex-1 pt-4 text-[9.5pt] leading-[5.1mm]">
            {page.lines.map((line, index) => line.kind === 'spacer'
              ? <div key={index} className="h-[5.1mm]" />
              : <p key={index} className={line.kind === 'heading' ? 'font-bold uppercase tracking-[0.025em]' : line.kind === 'bullet' ? 'pl-2' : ''}>{line.text}</p>)}
          </main>
          {page.number === page.totalPages && signatureBoxes.length ? (
            <section className="mb-[4mm] grid grid-cols-2 gap-[3mm]" aria-label="Quadro de assinaturas">
              {signatureBoxes.map((box) => (
                <div key={box.title} className="flex h-[24mm] flex-col justify-between rounded-[2mm] border border-slate-400 p-[3mm] text-[7.5pt]">
                  <p className="font-bold uppercase tracking-[0.04em]">{box.title}</p>
                  <div className="space-y-[2mm] text-slate-600">
                    <p>{box.nameLabel}</p>
                    {box.registrationLabel ? <p>{box.registrationLabel}</p> : null}
                    <div className="border-t border-slate-500 pt-[1mm] text-center">Assinatura</div>
                  </div>
                </div>
              ))}
            </section>
          ) : null}
          <footer className="flex h-[8mm] items-end justify-between border-t border-slate-200 pt-2 text-[7.5pt] text-slate-400"><span>ConsultaVet • Documento emitido pelo profissional responsável</span><span>Página {page.number} de {page.totalPages}</span></footer>
        </article>
      ))}
    </div>
  );
}
