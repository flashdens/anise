from flask import Blueprint, jsonify, request
from __main__ import blueprints

receive_move_blueprint = Blueprint('receive_move', __name__)
blueprints.append(receive_move_blueprint)


@receive_move_blueprint.route('/api/receive_move', methods=['POST'])
def receive_move():
    print(request.json)
    return jsonify({
        "message": "JSON received successfully!"
    })
