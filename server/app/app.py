from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder='/home/miloszek/PycharmProjects/anise/server/templates')
CORS(app)


@app.route("/api/home", methods=["GET"])
def return_home():
    return jsonify(
        {
            'message': "Hello zos from flaszka!"
        }
    )


@app.route('/checkers')
def home():
    # Representing the board with a 2D list
    # 1 for a hole, 0 for no hole
    board = [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0]
        # Add more rows to accurately represent the full board
    ]
    return render_template('chinese_checkers.html', board=board)

@app.route("/message")
def message():
    my_message = 'bociu and zos are the best bros'

    return render_template('index.html', hello="czesc")


@app.route('/api/draw')
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

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host="localhost", debug=True, port=8080)
