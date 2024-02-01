from flask import jsonify
from __main__ import app


@app.route('/api/draw', methods=['GET'])
def test():
    tiles = [
        {"symbol": "A", "color": "yellow", "id": 1},
        {"symbol": "B", "color": "blue", "id": 2},
        {"symbol": "C", "color": "red", "id": 3},
        {"symbol": "D", "color": "green", "id": 4},
        {"symbol": "E", "color": "orange", "id": 5},
        {"symbol": "F", "color": "purple", "id": 6}
    ]
    return jsonify(tiles)
