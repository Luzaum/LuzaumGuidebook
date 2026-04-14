import type { StoredCalculationReport } from '../types'
import { buildPrintableReportViewModel, buildSharedFeedingSheetMetaFields } from '../lib/reportPresentation'

function chunkPairs<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function SectionTable({
  title,
  fields,
  columns = 2,
  triple = false,
}: {
  title: string
  fields: Array<{ label: string; value: string }>
  columns?: number
  triple?: boolean
}) {
  const titleFs = triple ? '14px' : '13px'
  const bodyFs = triple ? '12px' : undefined
  const mb = triple ? '12px' : '14px'
  return (
    <section style={{ marginBottom: mb }}>
      <div style={{ fontSize: titleFs, fontWeight: 700, borderBottom: '1px solid #d6d6d6', paddingBottom: '4px', marginBottom: triple ? '10px' : '8px' }}>
        {title}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: '6px 18px',
        }}
      >
        {fields.map((field) => (
          <div key={field.label} style={bodyFs ? { fontSize: bodyFs, lineHeight: 1.45 } : undefined}>
            <strong>{field.label}:</strong> {field.value}
          </div>
        ))}
      </div>
    </section>
  )
}

function DataTable({
  title,
  headers,
  rows,
  dense = false,
  triple = false,
}: {
  title: string
  headers: string[]
  rows: string[][]
  dense?: boolean
  triple?: boolean
}) {
  const fs = triple ? '10px' : dense ? '9px' : '11px'
  const titleFs = triple ? '12px' : dense ? '11px' : '13px'
  const cellPad = triple ? '10px 9px' : dense ? '5px 7px' : '6px 8px'
  const rowMinH = triple ? '2.4rem' : undefined
  return (
    <section style={{ marginBottom: triple ? '14px' : dense ? '10px' : '14px' }}>
      <div
        style={{
          fontSize: titleFs,
          fontWeight: 700,
          borderBottom: '1px solid #d6d6d6',
          paddingBottom: '4px',
          marginBottom: triple ? '8px' : dense ? '5px' : '8px',
        }}
      >
        {title}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: fs }}>
        <thead>
          <tr style={{ backgroundColor: '#f6f4f1' }}>
            {headers.map((header) => (
              <th
                key={header}
                style={{ border: '1px solid #d7d1ca', padding: cellPad, textAlign: 'left' }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${title}-${index}`} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#fbfaf8' }}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${title}-${index}-${cellIndex}`}
                  style={{
                    border: '1px solid #e0dbd3',
                    padding: cellPad,
                    verticalAlign: 'top',
                    minHeight: rowMinH,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default function PrintableReportDocument({
  report,
  className = 'hidden print:block',
}: {
  report: StoredCalculationReport
  className?: string
}) {
  const vm = buildPrintableReportViewModel(report)

  return (
    <div
      id="print-report-root"
      className={className}
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '11px',
        lineHeight: 1.5,
        color: '#1d1a17',
        background: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #e5630a', paddingBottom: '8px', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#e5630a' }}>NutriçãoVET — Relatório nutricional</div>
          <div style={{ fontSize: '11px', color: '#62594f' }}>Emitido em {vm.generatedAt}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '11px', color: '#62594f' }}>
          <div>{vm.patientTitle}</div>
          <div>{vm.patientSubtitle}</div>
        </div>
      </div>

      <SectionTable title="1. Identificação do paciente" fields={vm.patientFields} columns={3} />
      <SectionTable title="2. Dados clínicos" fields={vm.clinicalFields} columns={2} />
      <SectionTable title="3. Cálculo energético" fields={vm.energyFields} columns={2} />
      <SectionTable title="4. Meta nutricional" fields={vm.targetFields} columns={3} />
      <SectionTable title="5. Fórmula geral" fields={vm.formulaMetaFields} columns={3} />

      <DataTable
        title="6. Fórmula alimentar"
        headers={['Alimento', 'Inclusão', 'Oferta diária', 'Energia']}
        rows={vm.formulaRows}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
        <DataTable title="7. Resumo nutricional" headers={['Nutriente', 'Valor']} rows={vm.nutrientRows} />
        <DataTable title="8. Partição energética" headers={['Macro', '%', 'Gramas', 'Kcal']} rows={vm.macroRows} />
      </div>

      <DataTable
        title="9. Contribuição por alimento"
        headers={['Alimento', 'Categoria', 'Oferta diária', 'Energia', 'Por refeição']}
        rows={vm.contributionRows}
      />

      {vm.alertNotes.length > 0 && (
        <section style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #d6d6d6', paddingBottom: '4px', marginBottom: '8px' }}>
            10. Observações finais
          </div>
          <div style={{ display: 'grid', gap: '6px' }}>
            {vm.alertNotes.map((note) => (
              <div
                key={note}
                style={{
                  padding: '7px 9px',
                  border: '1px solid #ead6bd',
                  borderRadius: '6px',
                  backgroundColor: '#fff8ef',
                }}
              >
                {note}
              </div>
            ))}
          </div>
        </section>
      )}

      {vm.feedingSheetTripleDayLayout && vm.feedingSheets.length > 0
        ? chunkPairs(vm.feedingSheets, 3).map((slice, pageIdx) => {
            const totalFolhas = Math.ceil(vm.feedingSheets.length / 3)
            const sharedFields = buildSharedFeedingSheetMetaFields(report, slice)
            return (
              <div
                key={`feeding-triple-${pageIdx}`}
                id={`print-feeding-sheet-triple-${pageIdx}`}
                className="rx-page-break"
                style={{ breakBefore: 'page', paddingTop: '6px' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '12px',
                    borderBottom: '2px solid #e5630a',
                    paddingBottom: '8px',
                    marginBottom: '10px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#e5630a' }}>{vm.feedingSheetTitle}</div>
                    <div style={{ fontSize: '11px', color: '#62594f' }}>Página operacional para rotina diária</div>
                    {vm.feedingSheetPrintBanner && (
                      <div style={{ fontSize: '10px', color: '#786e63', marginTop: '4px', maxWidth: '440px' }}>{vm.feedingSheetPrintBanner}</div>
                    )}
                  </div>
                  <div style={{ fontSize: '10px', color: '#62594f', textAlign: 'right' }}>
                    <div>
                      Folha de ficha {pageIdx + 1} de {totalFolhas} — 3 dias por folha
                    </div>
                    <div style={{ marginTop: '4px' }}>{vm.patientTitle}</div>
                  </div>
                </div>

                <SectionTable title="Dados da ficha" fields={sharedFields} columns={2} triple />

                <DataTable
                  title="Alimentos utilizados"
                  headers={['Alimento', 'Oferta diária total', 'Por refeição']}
                  rows={slice[0].foodRows}
                  triple
                />

                {slice.map((sheet) => (
                  <DataTable
                    key={sheet.dateIso}
                    triple
                    title={`Controle diário — Dia ${sheet.dateLabel}`}
                    headers={['Horário', 'Quantidade/refeição', 'Alimentos', 'Comeu? Sim/não (pesar sobra)', 'Assinatura']}
                    rows={sheet.rows}
                  />
                ))}
              </div>
            )
          })
        : vm.feedingSheets.map((sheet, index) => (
            <div
              key={`${sheet.dateLabel}-${index}`}
              id={`print-feeding-sheet-${index}`}
              className="rx-page-break"
              style={{ breakBefore: 'page', paddingTop: '6px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #e5630a', paddingBottom: '8px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#e5630a' }}>{vm.feedingSheetTitle}</div>
                  <div style={{ fontSize: '11px', color: '#62594f' }}>Página operacional para rotina diária</div>
                </div>
                <div style={{ fontSize: '11px', color: '#62594f', textAlign: 'right' }}>{vm.patientTitle}</div>
              </div>

              <SectionTable title="Dados da ficha" fields={sheet.meta} columns={2} />

              <DataTable
                title="Alimentos utilizados"
                headers={['Alimento', 'Oferta diária total', 'Por refeição']}
                rows={sheet.foodRows}
              />

              <DataTable
                title="Controle diário"
                headers={['Horário', 'Quantidade/refeição', 'Alimentos', 'Comeu? Sim/não (pesar sobra)', 'Assinatura']}
                rows={sheet.rows}
              />
            </div>
          ))}
    </div>
  )
}

