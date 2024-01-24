from flask import Flask
from flask_cors import CORS

blueprints = []
from api_url_map import register_api_routes


app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

register_api_routes(app, blueprints)

print(app.blueprints)

if __name__ == '__main__':
    app.run(host="localhost", debug=True, port=8080)
