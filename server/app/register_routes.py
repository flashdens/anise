# since importing a package executes it, all these routes will get registered by app

from __main__ import app

from flask import jsonify

import api.game.get_tiles
import api.game.send_move
import api.game.exchange_tiles

import api.lobby.get_lobbies
import api.lobby.get_lobby

import api.lobby.create_lobby
import api.lobby.join_lobby
# import api.lobby.leave_lobby

import sockets.start_game
import sockets.update_board_state


@app.route('/')
def index():
    return jsonify({"message": "this is the main api endpoint for anise. to play, please head to "
                               "limba.wzks.uj.edu.pl:42101"})
