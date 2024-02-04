from flask import jsonify, request, session
from __main__ import app
from server.app.models.lobby.lobby import Lobby, lobbies


@app.route('/api/lobby/create', methods=['POST'])
def create_lobby():
    data = request.get_json()
    name = data['lobbyName']
    host = data['playerName']
    if name is None:
        return jsonify({"error": "Lobby name is empty!"}), 400
    new_lobby = Lobby(name=name, host=host)
    session.permanent = True
    session['player_name'] = host
    lobbies.append(new_lobby)
    print(lobbies)
    return jsonify({"message": "done"}), 200
