#!/usr/bin/python3

import requests
import sys

if len(sys.argv) < 4:
    print("Args: signup.py username email password")
    exit()

data = {
    'username': sys.argv[1],
    'email': sys.argv[2],
    'password': sys.argv[3]
}

print(requests.post("http://localhost/api/user/signup/", json=data).text)

