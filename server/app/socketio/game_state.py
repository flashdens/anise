from __main__ import socketio, app
from server.app.models.lobby.lobby import lobbies
from flask_socketio import emit

@socketio.on('game_state')
def change_board_state(lobby_id):

    socketio.emit()
