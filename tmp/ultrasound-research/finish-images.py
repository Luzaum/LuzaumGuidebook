import pathlib,json,re,urllib.request,xml.etree.ElementTree as E,html,sys
sys.stdout.reconfigure(encoding='utf-8')
p=pathlib.Path('tmp/ultrasound-research/image-manifest.json');m=json.loads(p.read_text(encoding='utf-8'))
for organ,id,fid in [('prostate','PMC7924405','animals-11-00559-f001'),('ovaries','PMC8146485','animals-11-01213-f001')]:
 root=E.parse('tmp/ultrasound-research/'+id+'.xml').getroot();fig=next(f for f in root.findall('.//fig') if f.attrib.get('id')==fid);filename=fig.find('.//graphic').attrib['{http://www.w3.org/1999/xlink}href'];url='https://pmc.ncbi.nlm.nih.gov/articles/'+id+'/?pdf=1';t=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})).read().decode();src=next(html.unescape(x) for x in re.findall(r'<img[^>]+src="([^"]+)"',t) if filename in x)
 m[organ]=dict(src='/assets/consulta-vet/ultrasound-clinical/'+organ+'.jpg',article='https://pmc.ncbi.nlm.nih.gov/articles/'+id+'/',title=''.join(root.find('.//article-title').itertext()),author='; '.join(' '.join(''.join(n.itertext()).split()) for n in root.findall('.//article-meta/contrib-group/contrib/name')),license='CC BY 4.0',licenseUrl='https://creativecommons.org/licenses/by/4.0/',figure=fid,original=src,originalCaption=''.join(fig.find('caption').itertext()))
for organ,doi,fig,title in [('adrenals','fvets.2024.1477208','g002','Ultrasonographic adrenal gland changes in dogs with Cushing’s syndrome'),('eyes','fvets.2024.1482948','g0001','Ultrasonographic assessment of ocular parameters in dogs'),('uterus','fvets.2026.1717774','g002','Insights into canine reproductive health: ultrasonographic evaluation of the uterus—a review')]:
 t=pathlib.Path('tmp/ultrasound-research/'+doi+'.html').read_text(encoding='utf-8');src=next(x for x in re.findall(r'<img[^>]+src="([^"]+)"',t) if 'xml-images' in x and '-'+fig+'.' in x)
 authors=re.findall(r'<meta[^>]+name="citation_author"[^>]+content="([^"]+)"',t)
 author='; '.join(html.unescape(x) for x in authors)
 if not author:
  for match in re.finditer(r'citation_author',t):print(organ,t[match.start()-80:match.start()+140])
 raw=urllib.request.urlopen(src).read();path=pathlib.Path('public/assets/consulta-vet/ultrasound-clinical/'+organ+'.webp');path.write_bytes(raw)
 m[organ]=dict(src='/assets/consulta-vet/ultrasound-clinical/'+organ+'.webp',article='https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/'+doi+'/full',title=title,author=author,license='CC BY 4.0',licenseUrl='https://creativecommons.org/licenses/by/4.0/',figure=fig,original=src)
for k,v in m.items():v['src']=v['src'].replace('/public/','/')
m['liver']['license']='CC BY 3.0';m['liver']['licenseUrl']='https://creativecommons.org/licenses/by/3.0/'
p.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print([(k,v.get('error')) for k,v in m.items()])

