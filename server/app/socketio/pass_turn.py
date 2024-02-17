from __main__ import socketio
from server.app.models.lobby.lobby import lobbies
from flask_socketio import emit


def pass_turn(game):
    game.game_state.player_turn = (game.game_state.player_turn % len(game.players)) + 1
    socketio.emit('pass_turn', game.game_state.player_turn)
