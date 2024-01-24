from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

import register_routes

CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

if __name__ == '__main__':
    app.run(host="localhost", debug=True, port=8080)
