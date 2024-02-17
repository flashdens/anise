from __main__ import socketio
from server.app.models.lobby.lobby import lobbies
from flask_socketio import emit
from server.app.socketio.pass_turn import pass_turn


def update_board_state(game):
    current_board_state = [[tile.to_dict() if tile else None for tile in row] for row in game.board.board]
    pass_turn(game)
    socketio.emit('board_state', current_board_state)
