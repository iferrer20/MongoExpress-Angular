import string
import random
import os

f = open(os.path.dirname(__file__) + "/../backend-express/src/private/jwt-key.js", "w")
f.write('export default \'' +  ''.join([random.choice(string.ascii_letters + string.digits) for i in range(20)]) + '\';')
f.close()

