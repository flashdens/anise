from flask import jsonify, redirect, url_for, request
from __main__ import app

from models.game.tile import Tile
from models.lobby.lobby import lobbies

from sockets.update_board_state import update_board_state

@app.route('/api/game/<int:lobby_id>/exchange_tiles/<int:player_id>', methods=['POST'])
def exchange_tiles(lobby_id, player_id):
    game = next((lobby.game for lobby in lobbies if lobby.id == lobby_id), None)
    data = request.get_json()
    tiles = [Tile(tile['color'], tile['symbol'], tile['id']) for tile in data['tiles']]
    for tile in tiles:
        matching_tile = [t for t in game.players[game.game_state.player_turn].rack if t.id == tile.id]
        if matching_tile:
            game.players[game.game_state.player_turn].rack.remove(matching_tile[0])
        else:
            return {"message": "something has gone terribly wrong..."}, 0

    update_board_state(game)
    return redirect(url_for('get_tiles', lobby_id=lobby_id, player_id=player_id))
