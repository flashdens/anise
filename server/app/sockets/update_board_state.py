from __main__ import socketio
from models.lobby.lobby import lobbies
from flask_socketio import emit


def update_board_state(game):
    current_board_state = [[tile.to_dict() if tile else None for tile in row] for row in game.board.board]
    game.game_state.player_turn = ((game.game_state.player_turn + 1) % len(game.players))
    socketio.emit('board_state', current_board_state)
