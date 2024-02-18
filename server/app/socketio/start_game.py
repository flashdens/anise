from __main__ import socketio
from server.app.models.lobby.lobby import lobbies
from flask_socketio import emit


@socketio.on('start_game')
def start_game(lobby_id):
    lobby_to_start = next((lobby for lobby in lobbies if lobby.id == lobby_id), None)
    if lobby_to_start is None:
        pass

    lobby_to_start.game.game_state.game_status = 2
    lobby_to_start.game.start_game()
    emit('game_started', {'lobby_id': lobby_to_start.id}, broadcast=True)
