import type { StoredCalculationReport } from '../types'
import { buildPrintableReportViewModel } from '../lib/reportPresentation'

function SectionTable({
  title,
  fields,
  columns = 2,
}: {
  title: string
  fields: Array<{ label: string; value: string }>
  columns?: number
}) {
  return (
    <section style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #d6d6d6', paddingBottom: '4px', marginBottom: '8px' }}>
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
          <div key={field.label}>
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
}: {
  title: string
  headers: string[]
  rows: string[][]
}) {
  return (
    <section style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #d6d6d6', paddingBottom: '4px', marginBottom: '8px' }}>
        {title}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f6f4f1' }}>
            {headers.map((header) => (
              <th
                key={header}
                style={{ border: '1px solid #d7d1ca', padding: '6px 8px', textAlign: header.includes('Alimento') ? 'left' : 'left' }}
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
                <td key={`${title}-${index}-${cellIndex}`} style={{ border: '1px solid #e0dbd3', padding: '6px 8px', verticalAlign: 'top' }}>
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
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#e5630a' }}>NutricaoVET • Relatorio nutricional</div>
          <div style={{ fontSize: '11px', color: '#62594f' }}>Emitido em {vm.generatedAt}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '11px', color: '#62594f' }}>
          <div>{vm.patientTitle}</div>
          <div>{vm.patientSubtitle}</div>
        </div>
      </div>

      <SectionTable title="1. Identificacao do paciente" fields={vm.patientFields} columns={3} />
      <SectionTable title="2. Dados clinicos" fields={vm.clinicalFields} columns={2} />
      <SectionTable title="3. Calculo energetico" fields={vm.energyFields} columns={2} />
      <SectionTable title="4. Meta nutricional" fields={vm.targetFields} columns={3} />
      <SectionTable title="5. Formula geral" fields={vm.formulaMetaFields} columns={3} />

      <DataTable
        title="6. Formula alimentar"
        headers={['Alimento', 'Inclusao', 'Oferta diaria', 'Energia']}
        rows={vm.formulaRows}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
        <DataTable title="7. Resumo nutricional" headers={['Nutriente', 'Valor']} rows={vm.nutrientRows} />
        <DataTable title="8. Particao energetica" headers={['Macro', '%', 'Gramas', 'Kcal']} rows={vm.macroRows} />
      </div>

      <DataTable
        title="9. Contribuicao por alimento"
        headers={['Alimento', 'Categoria', 'Oferta diaria', 'Energia', 'Por refeicao']}
        rows={vm.contributionRows}
      />

      {vm.alertNotes.length > 0 && (
        <section style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, borderBottom: '1px solid #d6d6d6', paddingBottom: '4px', marginBottom: '8px' }}>
            10. Observacoes finais
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

      <div id="print-feeding-sheet" className="rx-page-break" style={{ breakBefore: 'page', paddingTop: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #e5630a', paddingBottom: '8px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#e5630a' }}>{vm.feedingSheetTitle}</div>
            <div style={{ fontSize: '11px', color: '#62594f' }}>Pagina operacional isolada para rotina diaria</div>
          </div>
          <div style={{ fontSize: '11px', color: '#62594f', textAlign: 'right' }}>{vm.patientTitle}</div>
        </div>

        <SectionTable title="Dados da ficha" fields={vm.feedingSheetMeta} columns={2} />

        <DataTable
          title="Alimentos utilizados"
          headers={['Alimento', 'Oferta diaria total', 'Por refeicao']}
          rows={vm.feedingSheetFoodRows}
        />

        <DataTable
          title="Controle diario"
          headers={['Data', 'Horario', 'Quantidade/refeicao', 'Alimentos', 'Comeu? Sim/nao (pesar sobra)', 'Assinatura']}
          rows={vm.feedingSheetRows}
        />
      </div>
    </div>
  )
}
