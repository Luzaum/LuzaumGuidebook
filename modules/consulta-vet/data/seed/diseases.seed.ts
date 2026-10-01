import { linfomaMediastinalRecord } from './diseases.linfoma-mediastinal.seed';
import { intermacaoCaesGatosRecord } from './diseases.intermacao-caes-gatos.seed';
import { polirradiculoneuriteCaesGatosRecord } from './diseases.polirradiculoneurite-caes-gatos.seed';
import { tetanoCaesGatosRecord } from './diseases.tetano-caes-gatos.seed';
import { bruceloseCaesGatosRecord } from './diseases.brucelose-caes-gatos.seed';
import { megaesofagoCaesGatosRecord } from './diseases.megaesofago-caes-gatos.seed';
import { paralisiaLaringeaCaesGatosRecord } from './diseases.paralisia-laringea-caes-gatos.seed';
import { piotoraxRecord } from './diseases.piotorax.seed';
import { quilotoraxRecord } from './diseases.quilotorax.seed';
import { cistiteEnfisematosaCaesGatosSeed } from './diseases.cistite-enfisematosa-caes-gatos.seed';
import { discinesiaParoxisticaCaesGatosSeed } from './diseases.discinesia-paroxistica-caes-gatos.seed';
import { platinosomoseFelinaSeed } from './diseases.platinosomose-felina.seed';
import { triadeFelinaSeed } from './diseases.triade-felina.seed';
import { anemiaHemoliticaImunomediadaCaninaRecord } from './diseases.ahim-canina.seed';
import { sepseCaninaRecord } from './diseases.sepse-canina.seed';
import { obstrucaoFuncionalFluxoUrinarioRecord } from './diseases.obstrucao-funcional-fluxo-urinario-caes.seed';
import { sepseFelinaRecord } from './diseases.sepse-felina.seed';
import { lesaoRenalAgudaFelinaRecord } from './diseases.lesao-renal-aguda-felina.seed';
import { pielonefriteCaesGatosRecord } from './diseases.pielonefrite-caes-gatos.seed';
import { lesaoRenalAgudaCaninaRecord } from './diseases.lesao-renal-aguda-canina.seed';
import { trombocitopeniaCaesGatosSeed } from './diseases.trombocitopenia-caes-gatos.seed';
import { anemiaCaesGatosSeed } from './diseases.anemia-caes-gatos.seed';
import { leishmanioseCaesGatosSeed } from './diseases.leishmaniose-caes-gatos.seed';
import { cistiteIdiopaticaFelinaSeed } from './diseases.cistite-idiopatica-felina.seed';
import { DiseaseRecord } from '../../types/disease';
import { mergeConsensusSlugsForDisease } from './diseaseConsensusLinks';
import { colapsoTraquealCaninoRecord } from './diseases.colapso-traqueal.seed';
import { erliquioseMonociticaCaninaRecord } from './diseases.erlichia.seed';
import { micoplasmosesHemotropicasRecord } from './diseases.hemoplasma.seed';
import { leishmanioseVisceralCaninaRecord } from './diseases.leishmaniose.seed';
import { doencaRenalCronicaCaesGatosRecord } from './diseases.drc.seed';
import { hipertensaoArterialSistemicaRecord } from './diseases.hipertensao.seed';
import { doencaValvarMitralDegenerativaRecord } from './diseases.dmvd.seed';
import { sindromeCushingCaesRecord } from './diseases.sindrome-cushing-caes.seed';
import { sindromeCushingGatosRecord } from './diseases.sindrome-cushing-gatos.seed';
import { hipoadrenocorticismoAddisonRecord } from './diseases.hipoadrenocorticismo.seed';
import { hipertireoidismoFelinoRecord } from './diseases.hipertireoidismo.seed';
import { hipotireoidismoAdquiridoRecord } from './diseases.hipotireoidismo-adquirido.seed';
import { hipotireoidismoCongenitoRecord } from './diseases.hipotireoidismo-congenito.seed';
import { dtuifFelinaRecord } from './diseases.dtuif-felina.seed';
import { diabetesMellitusCaninaRecord } from './diseases.diabetes-mellitus-canina.seed';
import { diabetesMellitusFelinaRecord } from './diseases.diabetes-mellitus-felina.seed';
import { babesioseCaninaRecord } from './diseases.babesiose.seed';
import { cardiomiopatiaHipertroficaRecord } from './diseases.cardiomiopatia-hipertrofica.seed';
import { cardiomiopatiaDilatadaRecord } from './diseases.cardiomiopatia-dilatada.seed';
import { arritmiasCardiacasCaesGatosRecord } from './diseases.arritmias-cardiacas-caes-gatos.seed';
import { cardiomiopatiaRestritivaRecord } from './diseases.cardiomiopatia-restritiva.seed';
import { tumoresMamariosRecord } from './diseases.tumores-mamarios.seed';
import { mastiteRecord } from './diseases.mastite.seed';
import { asmaFelinaRecord } from './diseases.asma-felina.seed';
import { bronquiteCronicaRecord } from './diseases.bronquite-cronica.seed';
import { granulomaEosinofilicoFelinoRecord } from './diseases.granuloma-eosinofilico-felino.seed';
import { miasteniaGravisCaesGatosRecord } from './diseases.miastenia-gravis.seed';
import { sindromesMiastenicasCongenitasRecord } from './diseases.sindromes-miastenicas-congenitas.seed';
import { leucemiaViralFelinaRecord } from './diseases.leucemia-viral-felina.seed';
import { peritoniteInfecciosaFelinaRecord } from './diseases.peritonite-infecciosa-felina.seed';
import { imunodeficienciaFelinaFivRecord } from './diseases.imunodeficiencia-felina-fiv.seed';
import { insuficienciaPancreaticaExocrinaCaesGatosRecord } from './diseases.insuficiencia-pancreatica-exocrina-caes-gatos.seed';
import { giardiaseCaesGatosRecord } from './diseases.giardiase-caes-gatos.seed';
import { coccidioseCaesGatosRecord } from './diseases.coccidiose-caes-gatos.seed';
import { hiperparatireoidismoCaesGatosRecord } from './diseases.hiperparatireoidismo-caes-gatos.seed';
import { prostatiteCaesGatosRecord } from './diseases.prostatite-caes-gatos.seed';
import { gengivoestomatiteCronicaFelinaRecord } from './diseases.gengivoestomatite-cronica-felina.seed';
import { doencaPeriodontalCaesRecord } from './diseases.doenca-periodontal-caes.seed';
import { doencaPeriodontalGatosRecord } from './diseases.doenca-periodontal-gatos.seed';
import { dermatiteAtopicaCaninaRecord } from './diseases.dermatite-atopica-canina.seed';
import { sindromeCutaneaAtopicaFelinaRecord } from './diseases.sindrome-cutanea-atopica-felina.seed';
import { doencaDoDiscoIntervertebralCaesRecord } from './diseases.doenca-do-disco-intervertebral-caes.seed';
import { doencaDoDiscoIntervertebralGatosRecord } from './diseases.doenca-do-disco-intervertebral-gatos.seed';
import { fistulaPerianalFurunculoseAnalRecord } from './diseases.fistula-perianal.seed';
import { insulinomaCaesGatosRecord } from './diseases.insulinoma-caes-gatos.seed';
import { cetoacidoseDiabeticaCaesGatosRecord } from './diseases.cetoacidose-diabetica-caes-gatos.seed';
import { coagulacaoIntravascularDisseminadaRecord } from './diseases.coagulacao-intravascular-disseminada.seed';
import { sindromeMielodisplasicaRecord } from './diseases.sindrome-mielodisplasica.seed';
import { linfomaCutaneoRecord } from './diseases.linfoma-cutaneo.seed';
import { megacolonRecord } from './diseases.megacolon.seed';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

function withPlainLanguage(record: DiseaseRecord): DiseaseRecord {
  return {
    ...record,
    plainLanguage: record.plainLanguage ?? DISEASE_PLAIN_LANGUAGE[record.slug],
    relatedConsensusSlugs: mergeConsensusSlugsForDisease(record.slug, record.relatedConsensusSlugs),
  };
}

export const diseasesSeed: DiseaseRecord[] = [
  babesioseCaninaRecord,
  dtuifFelinaRecord,
  fistulaPerianalFurunculoseAnalRecord,
  sindromeCushingCaesRecord,
  sindromeCushingGatosRecord,
  leishmanioseVisceralCaninaRecord,
  erliquioseMonociticaCaninaRecord,
  colapsoTraquealCaninoRecord,
  asmaFelinaRecord,
  bronquiteCronicaRecord,
  granulomaEosinofilicoFelinoRecord,
  micoplasmosesHemotropicasRecord,
  doencaRenalCronicaCaesGatosRecord,
  hipertensaoArterialSistemicaRecord,
  doencaValvarMitralDegenerativaRecord,
  cardiomiopatiaHipertroficaRecord,
  cardiomiopatiaDilatadaRecord,
  arritmiasCardiacasCaesGatosRecord,
  cardiomiopatiaRestritivaRecord,
  hipoadrenocorticismoAddisonRecord,
  diabetesMellitusCaninaRecord,
  diabetesMellitusFelinaRecord,
  hipertireoidismoFelinoRecord,
  hipotireoidismoAdquiridoRecord,
  hipotireoidismoCongenitoRecord,
  tumoresMamariosRecord,
  mastiteRecord,
  miasteniaGravisCaesGatosRecord,
  sindromesMiastenicasCongenitasRecord,
  leucemiaViralFelinaRecord,
  peritoniteInfecciosaFelinaRecord,
  imunodeficienciaFelinaFivRecord,
  insuficienciaPancreaticaExocrinaCaesGatosRecord,
  giardiaseCaesGatosRecord,
  coccidioseCaesGatosRecord,
  hiperparatireoidismoCaesGatosRecord,
  insulinomaCaesGatosRecord,
  cetoacidoseDiabeticaCaesGatosRecord,
  prostatiteCaesGatosRecord,
  gengivoestomatiteCronicaFelinaRecord,
  doencaPeriodontalCaesRecord,
  doencaPeriodontalGatosRecord,
  dermatiteAtopicaCaninaRecord,
  sindromeCutaneaAtopicaFelinaRecord,
  doencaDoDiscoIntervertebralCaesRecord,
  doencaDoDiscoIntervertebralGatosRecord,
  coagulacaoIntravascularDisseminadaRecord,
  sindromeMielodisplasicaRecord,
  linfomaCutaneoRecord,
  megacolonRecord,
  linfomaMediastinalRecord,
  piotoraxRecord,
  quilotoraxRecord,
  cistiteEnfisematosaCaesGatosSeed,
  trombocitopeniaCaesGatosSeed,
  anemiaCaesGatosSeed,
  leishmanioseCaesGatosSeed,
  cistiteIdiopaticaFelinaSeed,
  discinesiaParoxisticaCaesGatosSeed,
  platinosomoseFelinaSeed,
  triadeFelinaSeed,
  anemiaHemoliticaImunomediadaCaninaRecord,
  sepseCaninaRecord,
  obstrucaoFuncionalFluxoUrinarioRecord,
  sepseFelinaRecord,
  lesaoRenalAgudaFelinaRecord,
  pielonefriteCaesGatosRecord,
  lesaoRenalAgudaCaninaRecord,
  intermacaoCaesGatosRecord,
  polirradiculoneuriteCaesGatosRecord,
  tetanoCaesGatosRecord,
  bruceloseCaesGatosRecord,
  megaesofagoCaesGatosRecord,
  paralisiaLaringeaCaesGatosRecord,
].map(withPlainLanguage);
