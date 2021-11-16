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

def registerOrLogin(req):
  url = "http://localhost/api/user/signup"
  user_acc = {
      'email': 'test@test.com',
      'username': 'testbot',
      'password': '123456'
  }
  print("---creating account")
  printRes(req.post(url, json=user_acc))

  url = "http://localhost/api/user/signin"
  print("---logging in")
  printRes(req.post(url, json=user_acc))

req = requests.Session()

registerOrLogin(req)

print("------CATEGORIES")
print("---listing")
listing = printRes(req.get(url))

for c in listing['list']:
  print("---deleting")
  printRes(req.delete(url + c['slug']))

print("---creating")
created = printRes(req.post(url, json=data))
print("---creating duplicate")
printRes(req.post(url, json=data))

print("---updating")
data['description'] = data['description'] + " upd"
updated = printRes(req.put(url + created['slug'], json=data))

assert(created['slug'] == updated['slug'])

print("---getting")
printRes(req.get(url + updated['slug']))

print("---deleting")
printRes(req.delete(url + updated['slug']))

print("---creating again")
for d in dummies:
  printRes(req.post(url, json=d))

print("---saving categories")
categories = printRes(req.get(url))['list']

url = "http://localhost/api/product/"
data = {'category': categories[0]['_id'], 'name': 'productoT', 'description': 'descripción producto' }

dummies = [
  {'category': categories[0]['_id'], 'name': 'producto1', 'description': 'descripción producto' },
  {'category': categories[1]['_id'], 'name': 'producto2', 'description': 'descripción producto2', 'quality': 'New', 'state': 'Reserved' },
  {'category': categories[2]['_id'], 'name': 'producto3', 'description': 'descripción producto3', 'quality': 'MinorDamages', 'state': 'Sold' },
  {'category': categories[2]['_id'], 'name': 'producto4', 'description': 'descripción producto4', 'quality': 'Broken', 'state': 'Available' },
  {'category': categories[2]['_id'], 'name': 'producto5', 'description': 'descripción producto5', 'quality': 'Decrepit', 'state': 'Available' },
  {'category': categories[2]['_id'], 'name': 'producto6', 'description': 'descripción producto6', 'state': 'Available' }
]

print("------PRODUCTS")
print("---listing")
listing = printRes(req.get(url))

for c in listing['list']:
  print("---deleting")
  printRes(req.delete(url + c['slug']))

print("---creating")
created = printRes(req.post(url, json=data))
print("---creating duplicate")
printRes(req.post(url, json=data))

print("---updating")
data['description'] = data['description'] + " upd"
updated = printRes(req.put(url + created['slug'], json=data))

assert(created['slug'] == updated['slug'])

print("---getting")
printRes(req.get(url + updated['slug']))

print("---deleting")
printRes(req.delete(url + updated['slug']))

print("---creating again")
i=0
for d in dummies:
  x = printRes(req.post(url, json=d))
  i = i + 1
  if i < 4:
    print("---liking")
    printRes(req.get(url + '/like/' + x['slug']))

