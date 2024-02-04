from flask import jsonify
from __main__ import app
from server.app.models.lobby.lobby import lobbies


@app.route('/api/lobby/get_lobbies', methods=['GET'])
def get_lobbies():
    dict_lobbies = [lobby.to_dict() for lobby in lobbies]
    return jsonify(dict_lobbies)
