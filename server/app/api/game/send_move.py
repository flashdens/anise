from flask import jsonify, request
from __main__ import app


@app.route('/api/game/send_move/lobby/<int:lobby_id/>', methods=['POST'])
def receive_move():
    print(request.json)
    return jsonify({
        "message": "JSON received successfully! This is a response."
    })
