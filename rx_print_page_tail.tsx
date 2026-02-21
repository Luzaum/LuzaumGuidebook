<aside className="w-full border-l border-[#274b20] bg-[#10200d] p-5 md:w-[420px] md:overflow-y-auto">
    <div className="mb-5">
        <h2 className="text-lg font-bold text-white">{isReviewMode ? 'Editor interativo' : 'Configurações de revisão'}</h2>
        <p className="text-xs text-slate-400">{isReviewMode ? 'Clique em um componente da receita para editar no painel.' : 'Edite formatação e informações sem sair da tela.'}</p>
    </div>

    <div className="space-y-4">
        {isReviewMode ? (
            <section className="rounded-xl border border-[#315d28] bg-[#132510] p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-white">{selection?.kind === 'item' ? 'Editor de Item' : 'Editor de Componente'}</h3>
                    <button type="button" className="rounded-md border border-[#345d2a] px-2 py-1 text-xs font-semibold hover:bg-[#1f3319]" onClick={saveReviewDraft}>Salvar rascunho</button>
                </div>

                {selectedItem ? (
                    <div className="space-y-3">
                        <label className="block text-xs text-slate-300">Medicamento
                            <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.name} onChange={(e) => patchSelectedItem((item) => ({ ...item, name: e.target.value }))} />
                        </label>

                        <div className="grid grid-cols-2 gap-2">
                            <label className="block text-xs text-slate-300">Dose
                                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.doseValue} onChange={(e) => patchSelectedItem((item) => ({ ...item, doseValue: e.target.value }))} />
                            </label>
                            <label className="block text-xs text-slate-300">Unidade
                                <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.doseUnit} onChange={(e) => patchSelectedItem((item) => ({ ...item, doseUnit: e.target.value }))}>
                                    {DOSE_UNIT_OPTIONS.map((unit) => (<option key={unit} value={unit}>{unit}</option>))}
                                </select>
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <label className="block text-xs text-slate-300">Frequência
                                <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.frequencyType} onChange={(e) => patchSelectedItem((item) => ({ ...item, frequencyType: e.target.value as PrescriptionItem['frequencyType'] }))}>
                                    <option value="timesPerDay">x vezes ao dia</option>
                                    <option value="everyHours">a cada X horas</option>
                                </select>
                            </label>
                            <label className="block text-xs text-slate-300">{selectedItem.frequencyType === 'everyHours' ? 'Intervalo (h)' : 'Vezes ao dia'}
                                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.frequencyType === 'everyHours' ? selectedItem.everyHours : selectedItem.timesPerDay} onChange={(e) => patchSelectedItem((item) => item.frequencyType === 'everyHours' ? { ...item, everyHours: e.target.value, frequencyToken: '' } : { ...item, timesPerDay: e.target.value, frequencyToken: '' })} />
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <label className="block text-xs text-slate-300">Duração (dias)
                                <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.durationDays} onChange={(e) => patchSelectedItem((item) => ({ ...item, durationDays: e.target.value }))} />
                            </label>
                            <label className="block text-xs text-slate-300">Via
                                <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.routeGroup} onChange={(e) => patchSelectedItem((item) => ({ ...item, routeGroup: e.target.value as RouteGroup }))}>
                                    {ROUTE_OPTIONS.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                                </select>
                            </label>
                        </div>

                        <label className="block text-xs text-slate-300">Instruções ao tutor
                            <textarea rows={4} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.instruction} onChange={(e) => patchSelectedItem((item) => ({ ...item, instruction: e.target.value, autoInstruction: false, manualEdited: true }))} />
                        </label>

                        <label className="block text-xs text-slate-300">Cautelas (uma por linha)
                            <textarea rows={3} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={selectedItem.cautions.join('\n')} onChange={(e) => patchSelectedItem((item) => ({ ...item, cautions: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean) }))} />
                        </label>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={selectedItem.autoInstruction} onChange={(e) => patchSelectedItem((item) => ({ ...item, autoInstruction: e.target.checked, manualEdited: !e.target.checked ? item.manualEdited : false }))} />Instrução automática</label>
                            <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={!!selectedItem.controlled} onChange={(e) => patchSelectedItem((item) => ({ ...item, controlled: e.target.checked }))} />Controle especial</label>
                        </div>

                        <p className="rounded-lg border border-[#2c5b22] bg-[#10200d] px-3 py-2 text-xs text-[#9cd78f]">Frequência atual: {resolveFrequency(selectedItem).label}</p>
                    </div>
                ) : selection?.kind === 'zone' ? (
                    <div className="space-y-3">
                        {selection.zone === 'header' ? (
                            <>
                                <label className="block text-xs text-slate-300">Nome da clínica
                                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.clinicName} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, clinicName: e.target.value } }))} />
                                </label>
                                <label className="block text-xs text-slate-300">Nome do prescritor
                                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.name} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, name: e.target.value } }))} />
                                </label>
                                <label className="block text-xs text-slate-300">CRMV
                                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.prescriber.crmv} onChange={(e) => updatePrescription((prev) => ({ ...prev, prescriber: { ...prev.prescriber, crmv: e.target.value } }))} />
                                </label>
                            </>
                        ) : null}

                        {selection.zone === 'patient' ? (
                            <>
                                <label className="block text-xs text-slate-300">Paciente
                                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.patient.name} onChange={(e) => updatePrescription((prev) => ({ ...prev, patient: { ...prev.patient, name: e.target.value } }))} />
                                </label>
                                <label className="block text-xs text-slate-300">Tutor / responsável
                                    <input className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.tutor.name} onChange={(e) => updatePrescription((prev) => ({ ...prev, tutor: { ...prev.tutor, name: e.target.value } }))} />
                                </label>
                            </>
                        ) : null}

                        {selection.zone === 'recommendations' ? (
                            <>
                                <label className="block text-xs text-slate-300">Recomendações (uma por linha)
                                    <textarea rows={4} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.recommendations.bullets.join('\n')} onChange={(e) => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, bullets: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean) } }))} />
                                </label>
                                <label className="block text-xs text-slate-300">Exames personalizados (uma por linha)
                                    <textarea rows={3} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={prescription.recommendations.customExams.join('\n')} onChange={(e) => updatePrescription((prev) => ({ ...prev, recommendations: { ...prev.recommendations, customExams: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean) } }))} />
                                </label>
                                <label className="block text-xs text-slate-300">Observação adicional de revisão
                                    <textarea rows={3} className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={inlineEditNote} onChange={(e) => setInlineEditNote(e.target.value)} />
                                </label>
                            </>
                        ) : null}

                        {selection.zone === 'signature' ? (
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={templateDraft.showSignature} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, showSignature: e.target.checked }))} />Mostrar assinatura digital</label>
                                <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded" checked={templateDraft.showTimestamp} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, showTimestamp: e.target.checked }))} />Mostrar data/hora</label>
                            </div>
                        ) : null}

                        {selection.zone === 'body' ? <p className="text-xs text-slate-400">Clique em um medicamento no preview para editar seus campos.</p> : null}
                    </div>
                ) : <p className="text-sm text-slate-400">Selecione uma área da receita para começar.</p>}
            </section>
        ) : null}

        <label className="block text-xs text-slate-400">Template
            <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={templateDraft.id} onChange={(e) => { const selected = db.templates.find((entry) => entry.id === e.target.value); if (selected) setTemplateDraft(selected) }}>
                {db.templates.map((template) => (<option key={template.id} value={template.id}>{template.name}</option>))}
            </select>
        </label>

        <label className="block text-xs text-slate-400">Fonte
            <select className="mt-1 w-full rounded-lg border border-[#335d2a] bg-[#12230f] px-3 py-2 text-sm text-white" value={templateDraft.fontFamily} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, fontFamily: e.target.value }))}>
                <option value="Manrope, Arial, sans-serif">Manrope</option>
                <option value="Arial, Helvetica, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="Georgia, serif">Georgia</option>
            </select>
        </label>

        <div className="grid grid-cols-2 gap-2">
            <label className="block text-xs text-slate-400">Fonte base
                <input type="range" min={10} max={16} value={templateDraft.fontSizePt} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, fontSizePt: Number(e.target.value) }))} className="mt-1 w-full accent-[#38ff14]" />
            </label>
            <label className="block text-xs text-slate-400">Título
                <input type="range" min={14} max={24} value={templateDraft.headingSizePt} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, headingSizePt: Number(e.target.value) }))} className="mt-1 w-full accent-[#38ff14]" />
            </label>
        </div>

        <div className="grid grid-cols-1 gap-2">
            <button type="button" className="rounded-lg bg-[#38ff14] px-3 py-2 text-sm font-bold text-[#10200d] hover:bg-[#2bd010]" onClick={saveTemplateDraft}>Salvar ajustes no template</button>
            <Link to="/receituario-vet/templates" className="rounded-lg border border-[#345d2a] bg-[#1a2e16] px-3 py-2 text-center text-sm font-semibold hover:bg-[#22381d]">Abrir editor de templates</Link>
        </div>
    </div>
</aside>
      </div >

{
    share.open ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-4 py-8" onClick={() => setShare((prev) => ({ ...prev, open: false }))}>
            <div className="w-full max-w-5xl rounded-2xl border border-[#376b2e] bg-[#12230f] text-slate-100 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-[#376b2e] px-6 py-4">
                    <div>
                        <h3 className="text-xl font-bold">Compartilhar Receita</h3>
                        <p className="text-sm text-slate-400">Envie por WhatsApp ou e-mail com anexo PDF.</p>
                    </div>
                    <button type="button" className="rounded-lg border border-[#376b2e] px-3 py-1.5 text-sm" onClick={() => setShare((prev) => ({ ...prev, open: false }))}>Fechar</button>
                </div>

                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
                    <section className="rounded-xl border border-[#376b2e] bg-[#1c3617] p-4">
                        <h4 className="mb-3 text-lg font-bold">WhatsApp</h4>
                        <label className="block text-xs text-slate-300">Telefone do tutor
                            <input className="mt-1 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm" value={share.whatsappPhone} onChange={(e) => setShare((prev) => ({ ...prev, whatsappPhone: e.target.value }))} />
                        </label>
                        <label className="mt-3 block text-xs text-slate-300">Mensagem personalizada
                            <textarea className="mt-1 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm" rows={5} value={share.whatsappMessage} onChange={(e) => setShare((prev) => ({ ...prev, whatsappMessage: e.target.value }))} />
                        </label>
                        <button type="button" className="mt-4 w-full rounded-lg bg-[#38ff14] px-3 py-2 text-sm font-bold text-[#10200d]" onClick={openWhatsApp}>Enviar via WhatsApp</button>
                    </section>

                    <section className="rounded-xl border border-[#376b2e] bg-[#1c3617] p-4">
                        <h4 className="mb-3 text-lg font-bold">E-mail</h4>
                        <label className="block text-xs text-slate-300">E-mail do tutor
                            <input className="mt-1 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm" value={share.email} onChange={(e) => setShare((prev) => ({ ...prev, email: e.target.value }))} />
                        </label>
                        <label className="mt-3 block text-xs text-slate-300">Assunto
                            <input className="mt-1 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm" value={share.emailSubject} onChange={(e) => setShare((prev) => ({ ...prev, emailSubject: e.target.value }))} />
                        </label>
                        <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={share.includeBcc} onChange={(e) => setShare((prev) => ({ ...prev, includeBcc: e.target.checked }))} className="h-4 w-4 rounded" />Enviar cópia para a clínica</label>
                        <button type="button" className="mt-4 w-full rounded-lg border border-[#376b2e] bg-[#12230f] px-3 py-2 text-sm font-semibold" onClick={openEmail}>Enviar por e-mail</button>
                    </section>
                </div>
            </div>
        </div>
    ) : null
}

{ toast ? <div className="fixed bottom-6 right-6 z-[95] rounded-xl border border-[#376b2e] bg-[#1a2e16] px-4 py-3 text-sm font-semibold text-[#9dff8d]">{toast}</div> : null }
    </div >
  )
}
