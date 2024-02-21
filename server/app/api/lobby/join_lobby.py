from flask import request, jsonify
from __main__ import app, socketio

from models.game.player import Player
from models.lobby.lobby import lobbies


def lobby_exists(searched_lobby_id):
    return any(lobby.id == searched_lobby_id for lobby in lobbies)


@app.route('/api/lobby/join/<int:lobby_id>', methods=['POST'])
def join_lobby(lobby_id):
    data = request.get_json()
    player_name = data.get('playerName')
    if not player_name:
        return jsonify({'error': 'Player name is required'}), 400

    if not lobby_exists(lobby_id):
        return jsonify({'error': f'Lobby {lobby_id} does not exist'}), 404

    lobby_to_join = next((lobby for lobby in lobbies if lobby.id == lobby_id), None)
    if lobby_to_join is None:
        return jsonify({'error': f'Lobby {lobby_id} does not exist, wtf?'}), 404

    if len(lobby_to_join.players) >= 4:
        return jsonify({'error': f'Lobby {lobby_id} is full!'}), 403

    if any(player.name == player_name for player in lobby_to_join.players):
        return jsonify({'error': f'Player name {player_name} already exists in lobby {lobby_id}'}), 409

    lobby_to_join.players.append(Player(player_name))
    socketio.emit('player_joined', {'player_name': player_name, 'lobby_id': lobby_id})

    return jsonify({'message': f'Successfully joined lobby {lobby_id}'}), 200
