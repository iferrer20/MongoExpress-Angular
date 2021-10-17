import requests
import json

url = "http://localhost/api/category/"
data = {'shortName': 'test', 'description': 'test category', 'iconName': 'test'}

dummies = [
  {'shortName': 'moda-complementos', 'description': 'Moda y Complementos', 'iconName': 'shirt'},
  {'shortName': 'telefonia', 'description': 'Móviles y Teléfonos', 'iconName': 'phone'},
  {'shortName': 'foto-audio-tv', 'description': 'Foto, Audio y TVs', 'iconName': 'tv'},
  {'shortName': 'electronica', 'description': 'Electronica', 'iconName': 'chip'},
  {'shortName': 'muebles', 'description': 'Muebles y decoracion', 'iconName': 'sofa'},
  {'shortName': 'deporte-ocio', 'description': 'Deporte y Ocio', 'iconName': 'ball'},
  {'shortName': 'libros-pelis-musica', 'description': 'Libros, Pelis y Música', 'iconName': 'book'}
]

def printRes(res):
  print(res.reason + " - " + res.text)
  try:
    return res.json()
  except:
    return res.text

print("---listing")
listing = printRes(requests.get(url))

for c in listing['data']:
  print("---deleting")
  printRes(requests.delete(url + c['slug']))

print("---creating")
created = printRes(requests.post(url, json=data))
print("---creating duplicate")
printRes(requests.post(url, json=data))

print("---updating")
data['description'] = data['description'] + " upd"
updated = printRes(requests.put(url + created['slug'], json=data))

assert(created['slug'] == updated['slug'])

print("---getting")
printRes(requests.get(url + updated['slug']))

print("---deleting")
printRes(requests.delete(url + updated['slug']))

print("---creating again")
for d in dummies:
  printRes(requests.post(url, json=d))

#print(requests.post("http://localhost/api/product/", json.dumps({'category': category, 'priceEurCent': 100, 'name': 'producto1', 'description': 'descripción producto'}), headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
#).text)
