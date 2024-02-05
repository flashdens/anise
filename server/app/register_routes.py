# since importing a package executes it, all these routes will get registered by app

import api.game.get_tiles
import api.game.send_move
import api.game.trade_tiles

import api.lobby.get_lobbies
import api.lobby.get_lobby

import api.lobby.create_lobby
import api.lobby.join_lobby

import server.app.socketio.start_game
import server.app.socketio.game_state