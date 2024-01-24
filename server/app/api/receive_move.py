from flask import jsonify, request
from __main__ import app


@app.route('/api/receive_move', methods=['POST'])
def receive_move():
    print(request.json)
    return jsonify({
        "message": "JSON received successfully! This is a response."
    })
