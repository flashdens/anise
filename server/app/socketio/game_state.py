from __main__ import socketio
from server.app.models.lobby.lobby import lobbies
from flask_socketio import emit

def update_client_game_state(board):
    board_state = [[tile.to_dict() if tile else None for tile in row] for row in board]
    print("ok")
    socketio.emit('board_state', board_state)
