from flask import jsonify
from __main__ import app
from models.lobby.lobby import lobbies


@app.route('/api/game/<int:lobby_id>/get_tiles/<int:player_id>/', methods=['GET'])
def get_tiles(lobby_id, player_id):
    game = next((lobby.game for lobby in lobbies if lobby.id == lobby_id), None)

    if game.game_state.game_status == 1:
        return jsonify({'message': 'game is not running!'}), 400

    if game.game_over():
        game.game_state.game_status = 3
        return jsonify({'message': 'game is not running!'}), 200


    player = game.players[player_id]
    tiles_to_draw = 6 - len(player.rack)

    for i in range(tiles_to_draw):
        player.draw_tile(game.bag)


    return jsonify(player.rack_to_dict())
