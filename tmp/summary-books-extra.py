import json,re
x=json.load(open('tmp/summary-books/ettinger-toc.json',encoding='utf8'))
for l,t,p in x:
 if (l==3 and (1300<p<1410 or 1470<p<1560 or 1840<p<1920 or 2105<p<2119 or 2218<p<2250 or 2338<p<2380)) or re.search('mastitis|platynos|giardia|coccidia|atopic|eosinophilic granuloma|pyothorax|chylothorax|megacolon|infectious peritonitis',t,re.I):print(l,p,t)
x=json.load(open('tmp/summary-books/plumb-toc.json',encoding='utf8'))
for l,t,p in x:
 if re.search('capromo|diazep',t,re.I):print(l,p,t)
