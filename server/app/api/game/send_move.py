from flask import jsonify, request, session
from __main__ import app
from server.app.models.lobby.lobby import lobbies


@app.route('/api/game/send_move/lobby/<int:lobby_id>/player/<int:player_num>', methods=['POST'])
def send_move(lobby_id, player_num):
    data = request.get_json()

    if data["playerName"] is None:
        return jsonify({"message": "player does not exist! please stop messing with my api"}), 403

    request_player_name = data["playerName"]
    # session_player_name = session["player_name"]

    game = next((lobby.game for lobby in lobbies if lobby.id == lobby_id), None)
    if game is None:
        return jsonify({"message": "game doesn't exist!"}), 404

    game_player_number = game.players.index(request_player_name)
    if game_player_number + 1 != player_num:
        return jsonify({"message": "you're not the player to move! please stop messing with my api"}), 403

    # if request_player_name != session_player_name:
    #     return jsonify({"message": "what the fuck?"}), 403

    received_move = data['move']
    message, move_score = game.process_move(received_move)

    if move_score == 0:
        return jsonify({message}), 422



    return jsonify({
        "message": "JSON received successfully! This is a response."
    })
