#!/usr/bin/python3

import requests
import sys

if len(sys.argv) < 3:
    print("Args: signin.py username password")
    exit()

data = {
    'username': sys.argv[1],
    'password': sys.argv[2]
}

print(requests.post("http://localhost/api/user/signin/", json=data).text)
