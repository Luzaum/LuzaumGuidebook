import React, { useId, useRef } from 'react';
import { BSAVA_ONCOLOGY_DRUGS } from '../../data/quickReferencesData';

const mechanisms: Record<string, [string, string, string, string]> = {
  doxorrubicina: ['Danifica o material genético e dificulta que a célula tumoral se multiplique.', 'Antraciclina que se intercala no DNA, interfere na topoisomerase II e favorece radicais livres. A topoisomerase ajuda a desenrolar e reorganizar o DNA; sua interferência acumula lesões incompatíveis com a sobrevivência celular.', 'Linfoma em protocolos combinados; hemangiossarcoma canino; casos selecionados de osteossarcoma e carcinomas mamários. O benefício e o objetivo variam com espécie, estágio e protocolo.', '75–76'],
  vincristina: ['Impede a célula de separar seus cromossomos para formar duas células novas.', 'Liga-se à tubulina e impede a montagem normal dos microtúbulos do fuso mitótico, interrompendo a mitose. Microtúbulos também participam do transporte neuronal, o que ajuda a explicar neuropatia e íleo.', 'Linfoma em CHOP/COP e tumor venéreo transmissível canino; outras neoplasias hematológicas em protocolos selecionados. Não é intercambiável com vinblastina.', '74'],
  ciclofosfamida: ['Produz lesões no DNA que dificultam a multiplicação das células.', 'É um pró-fármaco ativado no fígado. Seus metabólitos alquilantes formam ligações covalentes e ligações cruzadas no DNA. A acroleína é um metabólito associado à lesão vesical, não o objetivo antitumoral.', 'Principalmente linfoma e outras doenças linfoides em combinações. Há usos em sarcomas e carcinomas específicos; a modalidade metronômica tem objetivo e evidência próprios.', '73'],
  carboplatina: ['Cria ligações anormais no DNA, impedindo sua utilização adequada pela célula.', 'Composto de platina que forma ligações intra e intercadeias no DNA, prejudicando replicação e transcrição. A eliminação renal relaciona função renal à exposição ao medicamento.', 'Osteossarcoma canino em tratamento adjuvante após controle local; carcinomas selecionados conforme espécie e protocolo. Não substituir pela cisplatina em gatos.', '77'],
  lomustina: ['Lesa o DNA e consegue alcançar tecidos como o sistema nervoso central.', 'Nitrosoureia alquilante lipofílica. A passagem pela barreira hematoencefálica fundamenta seu estudo em tumores do SNC, mas atingir o tecido não garante resposta clínica.', 'Linfoma, sobretudo cutâneo, mastocitoma e situações selecionadas de tumores do SNC. Protocolos de resgate dependem dos tratamentos prévios.', '73–74'],
  crisantaspase: ['Retira do sangue um nutriente de que certas células de linfoma dependem: a asparagina.', 'A L-asparaginase hidrolisa a asparagina extracelular. Células linfoides com capacidade insuficiente de sintetizá-la ficam privadas desse aminoácido e reduzem a síntese proteica. Anticorpos contra a enzima podem causar hipersensibilidade ou neutralizar sua ação.', 'Linfoma e doenças linfoproliferativas em indução ou resgate. Conferir a preparação enzimática: produtos de origens diferentes não são automaticamente intercambiáveis.', '78'],
  vinblastina: ['Bloqueia a divisão celular ao interferir na estrutura que separa os cromossomos.', 'Alcaloide da vinca que altera a montagem dos microtúbulos e do fuso mitótico. Em comparação com vincristina, a mielossupressão costuma ser mais relevante e a neurotoxicidade menos proeminente.', 'Mastocitoma, especialmente protocolos sistêmicos caninos, e alguns protocolos de linfoma. A indicação depende de grau, estágio e possibilidade de controle local.', '74'],
  clorambucila: ['Danifica o DNA de forma útil em algumas neoplasias de evolução mais lenta.', 'Mostarda nitrogenada alquilante: forma ligações covalentes e cruzadas que comprometem a função do DNA. A administração prolongada pode produzir supressão medular cumulativa, mesmo quando há boa tolerância gastrointestinal.', 'Linfoma indolente, incluindo linfoma alimentar felino de baixo grau, e leucemia linfocítica crônica. Uso frequente ou em dias alternados para linfoma não significa automaticamente intenção metronômica.', '73'],
  mitoxantrona: ['Interfere no processamento do DNA e prejudica a multiplicação tumoral.', 'Antracenodiona que interfere na topoisomerase II. Sua atividade antitumoral e toxicidade não são idênticas às da doxorrubicina; menor frequência de cardiotoxicidade não significa ausência de risco.', 'Resgate de linfoma ou substituição em protocolos específicos; carcinoma urotelial e alguns carcinomas de células escamosas. A seleção depende da evidência para o tumor e da condição do paciente.', '76'],
};
const conventional = [
  ['Em palavras simples', 'Tratamento que busca matar células tumorais e reduzir a carga de doença, mantendo qualidade de vida. Pode ser usado sozinho ou junto à cirurgia e radioterapia.'],
  ['Como funciona', 'Muitos esquemas administram doses em ciclos, separados por intervalos para recuperação da medula óssea e do trato gastrointestinal. Combinações reúnem mecanismos diferentes para ampliar a ação e limitar resistência. Nem todo protocolo convencional é intravenoso ou utiliza intervalos de três semanas.'],
  ['Quando é considerado', 'Tumores sensíveis como linfomas, tratamento adjuvante de micrometástases em neoplasias selecionadas e controle paliativo. Remissão é redução ou desaparecimento detectável da doença; não equivale necessariamente a cura.'],
  ['Aprofundando', 'Dose, intensidade e intervalo equilibram morte tumoral e recuperação dos tecidos normais. O nadir é o ponto de menor contagem de células sanguíneas após a administração. Hemograma, função orgânica, toxicidade anterior e protocolo orientam a próxima aplicação.'],
];
const metronomic = [
  ['Em palavras simples', 'Doses relativamente baixas e repetidas continuamente, geralmente por via oral, para buscar controle sustentado da doença. O objetivo costuma ser estabilização, e não rápida redução de uma massa.'],
  ['Como funciona', 'Além da ação sobre células tumorais, procura afetar o microambiente: os vasos que alimentam o tumor e componentes da resposta imune. Antiangiogênese significa reduzir a formação de novos vasos.'],
  ['Aprofundando', 'A exposição crônica pode atingir células endoteliais e modular linfócitos T reguladores, relacionados à imunossupressão tumoral. Esses efeitos dependem do fármaco e do esquema; plausibilidade biológica não demonstra benefício em todo tipo de câncer.'],
  ['Indicações e limites', 'Há estudos em tumores sólidos selecionados, como sarcomas de tecidos moles caninos incompletamente ressecados. A evidência felina é mais limitada. Não é apenas reduzir uma dose convencional: o planejamento, o objetivo e a evidência precisam corresponder ao tumor.'],
  ['Monitorização', 'Baixa dose não significa ausência de toxicidade: acompanhar hemograma e órgãos de risco, incluindo trato urinário com ciclofosfamida. Associações com anti-inflamatórios dependem da indicação e das funções renal e gastrointestinal.'],
];
export function OncologyHelpButton({ id, label }: { id: string; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useId();
  const drug = BSAVA_ONCOLOGY_DRUGS.find(item => item.id === id);
  const key = id.split('-')[0];
  const mechanism = mechanisms[key];
  const sections = id === 'conventional' ? conventional : id === 'metronomic' ? metronomic : mechanism ? [
    ['Em palavras simples', mechanism[0]], ['Como age na célula', mechanism[1]],
    ['Indicações tumorais', drug?.regimen === 'metronomic' ? drug.indication : mechanism[2]],
    ...(drug?.regimen === 'metronomic' ? [['Neste esquema metronômico', 'A molécula mantém seu mecanismo alquilante, mas a exposição contínua busca efeitos também sobre vasos e imunidade do microambiente. A indicação deste cartão não deve ser extrapolada para todos os tumores.'], ...drug.keyNotes.map(text => ['Evidência e acompanhamento', text])] : []),
    ['Cuidados que decorrem da ação', drug?.keyNotes.join(' ') ?? ''],
  ] : [];
  return <>
    <button type="button" aria-label={`Ajuda: ${label}`} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-lg font-bold text-primary hover:bg-primary/20">?</button>
    <dialog ref={dialog} aria-labelledby={heading} className="m-auto max-h-[85vh] w-[min(760px,calc(100vw-32px))] overflow-y-auto rounded-3xl border border-border bg-background p-6 text-foreground shadow-xl backdrop:bg-black/50">
      <div className="mb-5 flex items-start justify-between gap-4"><h2 id={heading} className="text-xl font-bold">{label}</h2><button type="button" onClick={() => dialog.current?.close()} className="rounded-lg border border-border px-3 py-2 text-sm">Fechar ×</button></div>
      {sections.map(([title, text], i) => <section key={i} className="mb-5"><h3 className="mb-2 font-bold text-primary">{title}</h3><p className="text-sm leading-7">{text}</p></section>)}
      <footer className="border-t border-border pt-4 text-xs leading-6 text-muted-foreground">Fontes do acervo: BSAVA Manual of Canine and Feline Oncology, 3ª ed., cap. 7{mechanism ? `, pp. ${mechanism[3]}` : ''}. {(id === 'metronomic' || drug?.regimen === 'metronomic') && 'Therapeutic Strategies in Veterinary Oncology (2023), cap. 3, Metronomic Chemotherapy, pp. 41 em diante.'}{drug && <p>Referência específica do esquema: {drug.source}</p>}</footer>
    </dialog>
  </>;
}
