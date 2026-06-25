alter table public.consulta_vet_medications
  add column if not exists price_reference_amount_brl numeric,
  add column if not exists price_reference_label text,
  add column if not exists price_reference_presentation text,
  add column if not exists price_reference_source_name text,
  add column if not exists price_reference_source_url text,
  add column if not exists price_reference_checked_at date,
  add column if not exists price_reference_notes text;

with price_records as (
  select *
  from jsonb_to_recordset($records$
[
  {"slug":"prednisolona","amount_brl":93.99,"label":"R$ 93,99","presentation":"Prednisolona para cães e gatos, 10 comprimidos","source_name":"Petz","source_url":"https://www.petz.com.br/produto/anti-inflamatorio-presdnisolona-para-caes-e-gatos-10-comprimidos","checked_at":"2026-06-24","notes":null},
  {"slug":"sulfametoxazol-trimetoprima","amount_brl":53.50,"label":"R$ 53,50","presentation":"Sulfaprim Bravet, 10 comprimidos","source_name":"Pett Farma","source_url":"https://www.pettfarma.com.br/produto/sulfaprim-bravet-10-comprimidos-7174","checked_at":"2026-06-24","notes":null},
  {"slug":"amoxicilina-clavulanato","amount_brl":65.61,"label":"R$ 65,61","presentation":"Agemoxi CL 50 mg, 10 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/antibiotico-agener-uniao-agemoxi-cl-10-comprimidos/p","checked_at":"2026-06-24","notes":null},
  {"slug":"synulox-comprimidos-palataveis","amount_brl":103.40,"label":"R$ 103,40","presentation":"Synulox 50 mg, 10 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/synulox-50mg-10-comprimidos-palataveis-pfizer-saude-animal-102887/p","checked_at":"2026-06-24","notes":null},
  {"slug":"agemoxi-cl","amount_brl":23.29,"label":"R$ 23,29","presentation":"Agemoxi CL 50 mg, 10 comprimidos","source_name":"Drogasil","source_url":"https://www.drogasil.com.br/agemoxi-cl-para-caes-e-gatos-com-10-comprimidos-50mg-1414275.html","checked_at":"2026-06-24","notes":null},
  {"slug":"clavaseptin-p","amount_brl":77.91,"label":"R$ 77,91","presentation":"Clavaseptin P 62,5 mg, 10 comprimidos","source_name":"Agrosolo","source_url":"https://www.agrosolo.com.br/produto/antibiotico-clavaseptin-p-62-5-mg-vetoquinol-para-caes-e-gatos-blister-com-10-comprimidos-91935","checked_at":"2026-06-24","notes":null},
  {"slug":"doxifin-tabs","amount_brl":25.19,"label":"R$ 25,19","presentation":"Doxifin Tabs 50 mg, 14 comprimidos","source_name":"Drogarias Pacheco","source_url":"https://www.drogariaspacheco.com.br/doxifin","checked_at":"2026-06-24","notes":null},
  {"slug":"doxitec","amount_brl":39.59,"label":"R$ 39,59","presentation":"Doxitec 50 mg, 16 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/antibiotico-doxitec-syntec-16-comprimidos/p","checked_at":"2026-06-24","notes":null},
  {"slug":"trissulfin-sid","amount_brl":65.97,"label":"R$ 65,97","presentation":"Trissulfin SID 400 mg, 10 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/antimicrobiano-ouro-fino-trissulfin-sid-cart-com-10-comprimidos-3107847/p","checked_at":"2026-06-24","notes":null},
  {"slug":"sulfaprim-comprimidos","amount_brl":53.50,"label":"R$ 53,50","presentation":"Sulfaprim Bravet, 10 comprimidos","source_name":"Pett Farma","source_url":"https://www.pettfarma.com.br/produto/sulfaprim-bravet-10-comprimidos-7174","checked_at":"2026-06-24","notes":null},
  {"slug":"cefex","amount_brl":116.32,"label":"R$ 116,32","presentation":"Cefex 500 mg, 10 drágeas","source_name":"Petlove","source_url":"https://www.petlove.com.br/antimicrobiano-cepav-cefex-500-mg/p","checked_at":"2026-06-24","notes":null},
  {"slug":"ceftrat","amount_brl":161.91,"label":"R$ 161,91","presentation":"Ceftrat 100 mg, 12 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/antibacteriano-agener-uniao-ceftrat-para-caes-12-comprimidos/p","checked_at":"2026-06-24","notes":null},
  {"slug":"convenia","amount_brl":1323.77,"label":"R$ 1.323,77","presentation":"Convenia 10 mL","source_name":"PetCamp","source_url":"https://www.petcamp.com.br/convenia-10-ml-fr-x-1/p","checked_at":"2026-06-24","notes":null},
  {"slug":"baytril-flavour","amount_brl":32.90,"label":"R$ 32,90","presentation":"Baytril Flavour 50 mg","source_name":"Shopee","source_url":"https://shopee.com.br/Baytril-Flavour-50-Mg-1Blx10Cpr-i.293152127.26234624056","checked_at":"2026-06-24","notes":null},
  {"slug":"enrotrat-tabs","amount_brl":84.65,"label":"R$ 84,65","presentation":"Enrotrat Tabs 100 mg, 10 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/enrotrat-tabs---10-x-100mg-3101476/p","checked_at":"2026-06-24","notes":null},
  {"slug":"marbocyl-p","amount_brl":96.64,"label":"R$ 96,64","presentation":"Marbocyl P 5 mg, 10 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/antibiotico-vetoquinol-marbocy-p-5-mg-para-caes-e-gatos-de-2-a-9-kg/p","checked_at":"2026-06-24","notes":null},
  {"slug":"marbopet","amount_brl":97.01,"label":"R$ 97,01","presentation":"Marbopet 27,5 mg, 10 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/marbopet-comprimidos-275-mg-ceva-sante-animale-vetbrands-1021991/p","checked_at":"2026-06-24","notes":null},
  {"slug":"clinbacter","amount_brl":75.90,"label":"R$ 75,90","presentation":"Clinbacter 75 mg, 14 comprimidos","source_name":"AgroPet Mineiro","source_url":"https://www.agropetmineiro.com.br/clinbacter-75-mg-x-14-cprv/p","checked_at":"2026-06-24","notes":null},
  {"slug":"oralguard-clindamicina","amount_brl":52.11,"label":"R$ 52,11","presentation":"Oralguard 50 mg, 14 comprimidos","source_name":"Mercado Livre","source_url":"https://lista.mercadolivre.com.br/oralguard","checked_at":"2026-06-24","notes":null},
  {"slug":"stomorgyl","amount_brl":118.80,"label":"R$ 118,80","presentation":"Stomorgyl 2, 20 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/stomorgyl-2-antibiotico-merial-102817/p","checked_at":"2026-06-24","notes":null},
  {"slug":"giardicid","amount_brl":118.60,"label":"R$ 118,60","presentation":"Giardicid suspensão 50 mL","source_name":"Petlove","source_url":"https://www.petlove.com.br/giardicid-50ml-suspensao-cepav-pharma-1019696/p","checked_at":"2026-06-24","notes":null},
  {"slug":"doxitrat","amount_brl":34.11,"label":"R$ 34,11","presentation":"Doxitrat 80 mg, 12 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/doxitrat-80mg-caixa-com-12-comprimidos-agener-uniao-1017386/p","checked_at":"2026-06-24","notes":null},
  {"slug":"zelotril","amount_brl":26.80,"label":"R$ 26,80","presentation":"Zelotril 50 mg, 12 comprimidos","source_name":"Drogasil","source_url":"https://www.drogasil.com.br/bactericida-zelotril-para-caes-e-gatos-12-comprimidos-50mg-1413941.html","checked_at":"2026-06-24","notes":null},
  {"slug":"tobrasyn","amount_brl":45.49,"label":"R$ 45,49","presentation":"Tobrasyn colírio 5 mL","source_name":"Amazon","source_url":"https://www.amazon.com.br/Col%C3%ADrio-Syntec-Tobrasyn-para-Gatos/dp/B07NH5M6KJ","checked_at":"2026-06-24","notes":null},
  {"slug":"auritop","amount_brl":62.24,"label":"R$ 62,24","presentation":"Auritop 15 g","source_name":"Petz","source_url":"https://www.petz.com.br/produto/auritop-ourofino-gel-otologico-para-caes-e-gatos-15g-190178","checked_at":"2026-06-24","notes":null},
  {"slug":"aurigen","amount_brl":56.95,"label":"R$ 56,95","presentation":"Aurigen 15 g","source_name":"Agrotela","source_url":"https://agrotela.com.br/produto/aurigen-gel-ourofino-15g/","checked_at":"2026-06-24","notes":null},
  {"slug":"otomax","amount_brl":95.31,"label":"R$ 95,31","presentation":"Otomax 12,5 g / 14 mL","source_name":"Petlove","source_url":"https://www.petlove.com.br/otomax-pomada-15-gramas-103283/p","checked_at":"2026-06-24","notes":null},
  {"slug":"pregabalina","amount_brl":21.85,"label":"R$ 21,85","presentation":"Pregabalina 75 mg, 30 cápsulas, genérico","source_name":"Droga Raia","source_url":"https://www.drogaraia.com.br/search?w=pregabalina","checked_at":"2026-06-24","notes":"Preço de medicamento humano usado como referência comercial, não apresentação veterinária dedicada."},
  {"slug":"maropitant","amount_brl":120.29,"label":"R$ 120,29","presentation":"Cerenia 16 mg, 4 comprimidos","source_name":"Amazon","source_url":"https://www.amazon.com.br/Cerenia-Compr-Zoetis-para-C%C3%A3es/dp/B07NF24S3L","checked_at":"2026-06-24","notes":null},
  {"slug":"benazepril","amount_brl":99.00,"label":"R$ 99,00","presentation":"Fortekor 5 mg, 28 comprimidos","source_name":"Mercado AgroPet","source_url":"https://www.mercadoagropet.com.br/fortekor-5mg-28-comprimidos","checked_at":"2026-06-24","notes":null},
  {"slug":"pimobendan","amount_brl":197.10,"label":"R$ 197,10","presentation":"Vetmedin 1,25 mg, 50 comprimidos","source_name":"Petlove","source_url":"https://www.petlove.com.br/vetmedin-boehringer-ingelheim-50-comprimidos-mastigaveis-para-caes/p","checked_at":"2026-06-24","notes":null},
  {"slug":"benzafibrato","amount_brl":33.19,"label":"R$ 33,19","presentation":"Bezafibrato 200 mg, 20 comprimidos, genérico","source_name":"Drogasil","source_url":"https://www.drogasil.com.br/bezafibrato-200mg-emg-generico-20-comprimidos.html","checked_at":"2026-06-24","notes":"Preço de medicamento humano usado como referência comercial, não apresentação veterinária dedicada."}
]
$records$::jsonb) as r(
    slug text,
    amount_brl numeric,
    label text,
    presentation text,
    source_name text,
    source_url text,
    checked_at date,
    notes text
  )
)
update public.consulta_vet_medications m
set
  price_reference_amount_brl = p.amount_brl,
  price_reference_label = p.label,
  price_reference_presentation = p.presentation,
  price_reference_source_name = p.source_name,
  price_reference_source_url = p.source_url,
  price_reference_checked_at = p.checked_at,
  price_reference_notes = p.notes,
  updated_at = now()
from price_records p
where m.slug = p.slug;
