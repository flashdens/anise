from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

import sys
sys.path.append('/home/miloszek/PycharmProjects/anise/server/app')

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

import register_routes  # register all the routes

app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = 'ilovemaciejgodny'


if __name__ == '__main__':
    socketio.run(app, port=8080, debug=True, allow_unsafe_werkzeug=True)
