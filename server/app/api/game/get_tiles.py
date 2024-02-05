from flask import jsonify
from __main__ import app
from server.app.models.lobby.lobby import lobbies


@app.route('/api/game/<int:lobby_id>/tiles/<int:player_id>/', methods=['GET'])
def test(lobby_id, player_id):
    game = next((lobby.game for lobby in lobbies if lobby.id == lobby_id), None)

    if game.status != 2:
        return jsonify({'message': 'game is not running!'}), 400

    player = game.players[player_id - 1]
    tiles_to_draw = 6 - len(player.rack)

    for i in range(tiles_to_draw):
        player.draw_tile(game.bag)

    print(player.rack)
    return jsonify(player.rack)
