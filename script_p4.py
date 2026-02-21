new_component4 = """
                            {showResults && analysisResult && (
                                <div className="mt-8 space-y-4">
                                    {alerts.length > 0 && (
                                        <div className="mt-8 space-y-3">
                                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Alertas Clínicos</h2>
                                            {alerts.map((alert, index) => {
                                                const colors = { critical: 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600 text-red-900 dark:text-red-300', warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 dark:border-amber-600 text-amber-900 dark:text-amber-300' };
                                                return (
                                                    <div key={index} className={`p-4 border-l-4 rounded-r-lg ${colors[alert.type as keyof typeof colors]} flex items-center justify-between result-card ${showResults ? 'visible' : ''}`} style={{ transitionDelay: `${index * 100}ms`}} role="alert">
                                                        <div>
                                                            <p className="font-bold">{alert.type === 'critical' ? '🔴 Alerta Crítico' : '🟡 Atenção'}</p>
                                                            <p dangerouslySetInnerHTML={{ __html: alert.msg }} />
                                                        </div>
                                                        {alert.key && <button type="button" onClick={() => openModal(alert.key)} className="ml-2 text-xl hover:scale-110 transition-transform">❓</button>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ResultCard title="1. Base da Amostra" content={analysisResult.sampleCheck.message} emoji={analysisResult.sampleCheck.emoji} dataKey="sampleType" openModal={openModal} delay={0} />
                                        <ResultCard title="2. Status do pH" content={`pH ${analysisResult.phStatus.state}`} emoji={analysisResult.phStatus.emoji} dataKey="diagnosis" openModal={openModal} delay={100} />
                                        <ResultCard title="3. Distúrbio Primário" content={`${analysisResult.primaryDisorder.disorder} <br/><small class="text-slate-500 dark:text-slate-400">Causa: ${analysisResult.primaryDisorder.cause}</small>`} emoji={analysisResult.primaryDisorder.emoji} dataKey="diagnosis" openModal={openModal} delay={200} />
                                        <ResultCard title="4. Ventilação" content={analysisResult.ventilationStatus.state} emoji={analysisResult.ventilationStatus.emoji} dataKey="ventilation" openModal={openModal} delay={300} />
                                    </div>
                                    <ResultCard title="5. Avaliação da Compensação" content={`Status: ${analysisResult.compensation.status}<br><small class="text-slate-500 dark:text-slate-400">Esperado: ${JSON.stringify(analysisResult.compensation.expected)}</small>${analysisResult.compensation.mixedDisorder ? `<br><strong class="text-slate-900 dark:text-white mt-1 block">Distúrbio Misto Sugerido: ${analysisResult.compensation.mixedDisorder}</strong>` : ''}`} emoji='⚖️' dataKey="compensation" openModal={openModal} delay={400} />
                                    <ResultCard title="6. Avaliação da Oxigenação" content={analysisResult.oxygenation.content} emoji={analysisResult.oxygenation.emoji} dataKey="oxygenation" openModal={openModal} delay={500} />
                                    <ElectrolyteCard electrolyteStatus={analysisResult.electrolyteStatus} openModal={openModal} delay={600} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <ResultCard title="8. Anion Gap (AG)" content={`AG: ${analysisResult.anionGap.value} mEq/L<br>AG Corrigido: ${analysisResult.anionGap.correctedValue} mEq/L<br><strong class="text-slate-900 dark:text-white mt-1 block">Interpretação: ${analysisResult.anionGap.interpretation}</strong>`} emoji=' Gap ' dataKey="anionGap" openModal={openModal} delay={700} />
                                        <ResultCard title="9. Diferenciais" content={`<ul class="space-y-1 mt-1">${analysisResult.differentials.map(d => `<li class="ml-4 list-disc text-slate-700 dark:text-slate-300 leading-tight">${d}</li>`).join('')}</ul>`} emoji='🩺' dataKey="differentials" openModal={openModal} delay={800} />
                                    </div>
                                </div>
                            )}

                            {/* Accordion Footer: Best Practices */}
                            <section className="max-w-4xl mx-auto w-full mt-8">
                                <details className="group bg-slate-100 dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden transition-all duration-300 open:shadow-lg open:ring-1 open:ring-primary/20">
                                    <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-slate-200 dark:hover:bg-[#212e4a] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary dark:text-blue-400">menu_book</span>
                                            <span className="font-bold text-slate-700 dark:text-slate-200">Guia de Boas Práticas de Coleta</span>
                                        </div>
                                        <span className="material-symbols-outlined expand-icon text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                                    </summary>
                                    <div className="p-6 border-t border-slate-200 dark:border-border-dark bg-white dark:bg-[#151b28]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm text-green-500">check_circle</span>
                                                    Coleta e Armazenamento
                                                </h4>
                                                <ul className="list-disc pl-5 space-y-1 marker:text-slate-400">
                                                    <li>Amostra arterial é essencial para avaliar oxigenação.</li>
                                                    <li>Remova bolhas da seringa imediatamente (alteram pCO₂ e pO₂).</li>
                                                    <li>Analise em até 5 minutos ou armazene em gelo (máx 1 hora).</li>
                                                    <li>Sempre registre a temperatura para correção pelo analisador.</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm text-amber-500">warning</span>
                                                    Erros Comuns
                                                </h4>
                                                <ul className="list-disc pl-5 space-y-1 marker:text-slate-400">
                                                    <li>Excesso de heparina dilui a amostra e reduz pCO₂/HCO₃⁻.</li>
                                                    <li>Coleta traumática causa hemólise e eleva potássio falsamente.</li>
                                                    <li>Estase venosa prolongada eleva o lactato e altera o pH.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </section>
                        </form>
                    </div>
                )}
"""

with open(r"c:\PROJETOS VET\Vetius\p4.txt", "w", encoding="utf-8") as f:
    f.write(new_component4)

print("Part 4 created")
