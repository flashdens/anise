from flask import jsonify, session
from __main__ import app
from models.lobby.lobby import lobbies


@app.route('/api/lobby/<int:lobby_id>', methods=['GET'])
def get_lobby(lobby_id):
    lobby = next((lobby for lobby in lobbies if lobby.id == lobby_id), None)
    if lobby is None:
        return jsonify({'error': f'Lobby {lobby_id} does not exist'}), 404

    return jsonify(lobby.to_dict())
