import pathlib,re,urllib.request,xml.etree.ElementTree as E,html,json,sys,concurrent.futures
sys.stdout.reconfigure(encoding='utf-8')
items={'liver':('PMC3329710','fig18'),'gallbladder':('PMC6138112','F0001'),'spleen':('PMC8917151','Fig1'),'kidneys':('PMC8850297','F4'),'stomach':('PMC12888347','F0002'),'small-intestine':('PMC12888347','F0002'),'colon':('PMC12888347','F0002'),'pancreas':('PMC7203193','F0002'),'bladder':('PMC12071102','animals-15-01223-f001'),'prostate':('PMC7924405','animals-11-00559-f001'),'ovaries':('PMC8146485','animals-11-01213-f001'),'lymph-nodes':('PMC7763578','animals-10-02366-f001'),'ureters':('PMC8850297','F1'),'testes':('PMC11209051','vetsci-11-00270-f002'),'thyroid':('PMC9234484','F1'),'parathyroids':('PMC6313915','vetsci-05-00091-f001'),'heart':('PMC7857914','fig1')}
cache={};out=pathlib.Path('public/assets/consulta-vet/ultrasound-clinical');out.mkdir(parents=True,exist_ok=True)
def one(pair):
 organ,(id,fid)=pair
 try:
  root=E.parse('tmp/ultrasound-research/'+id+'.xml').getroot();fig=next(f for f in root.findall('.//fig') if f.attrib.get('id')==fid)
  gs=fig.findall('.//graphic'); g=next((x for x in gs if x.attrib.get('content-type') not in ['thumb']),gs[0]);filename=g.attrib['{http://www.w3.org/1999/xlink}href']
  url='https://pmc.ncbi.nlm.nih.gov/articles/'+id+'/?report=xml'
  data=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=35).read().decode('utf-8');pathlib.Path('tmp/ultrasound-research/'+id+'.html').write_text(data,encoding='utf-8')
  candidates=[html.unescape(x) for x in re.findall(r'<img[^>]+src="([^"]+)"',data) if filename in x]
  if not candidates: raise Exception('image not resolved '+filename)
  image=candidates[0];raw=urllib.request.urlopen(image,timeout=35).read();path=out/(organ+pathlib.Path(filename).suffix);path.write_bytes(raw)
  names=[' '.join(''.join(n.itertext()).split()) for n in root.findall('.//article-meta/contrib-group/contrib/name')]
  title=''.join(root.find('.//article-title').itertext())
  return organ,dict(src='/'+path.as_posix(),article=url,title=title,author='; '.join(names),license='CC BY 4.0',licenseUrl='https://creativecommons.org/licenses/by/4.0/',figure=fid,original=image,originalCaption=''.join(fig.find('caption').itertext()))
 except Exception as e:return organ,dict(error=str(e))
res=dict(map(one,items.items()));pathlib.Path('tmp/ultrasound-research/image-manifest.json').write_text(json.dumps(res,ensure_ascii=False,indent=2),encoding='utf-8')
for k,v in res.items():print(k,v.get('error',v['src'] if 'src'in v else ''))


