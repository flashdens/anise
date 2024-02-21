from flask import jsonify, request

from server.app.api.lobby.join_lobby import lobby_exists
from server.app.app import socketio, app
from models.lobby.lobby import lobbies


@app.route('/api/lobby/leave/<int:lobby_id>', methods=['POST'])
def leave_lobby(lobby_id):
    data = request.get_json()
    player_name = data.get('playerName')
    if not player_name:
        return jsonify({'error': 'Player name is required'}), 400

    if not lobby_exists(lobby_id):
        return jsonify({'error': f'Lobby {lobby_id} does not exist'}), 404

    lobby_to_leave = next((lobby for lobby in lobbies if lobby.id == lobby_id), None)
    if lobby_to_leave is None:
        return jsonify({'error': f'Lobby {lobby_id} does not exist'}), 404

    player_to_remove = next((player for player in lobby_to_leave.players if player.name == player_name), None)
    if player_to_remove is None:
        return jsonify({'error': f'Player {player_name} is not in lobby {lobby_id}'}), 404

    lobby_to_leave.players.remove(player_to_remove)
    socketio.emit('player_left', {'player_name': player_name, 'lobby_id': lobby_id})

    return jsonify({'message': f'Successfully left lobby {lobby_id}'}), 200
