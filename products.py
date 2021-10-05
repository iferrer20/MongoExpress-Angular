import requests
import json


print(requests.post("http://localhost/api/category", json={'shortName': 'test', 'description': 'test category', 'iconName': 'test'}).text)
#print(requests.post("http://localhost/api/product/", json.dumps({'category': category, 'priceEurCent': 100, 'name': 'producto1', 'description': 'descripción producto'}), headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
#).text)
