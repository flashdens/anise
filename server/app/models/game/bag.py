from server.app.models.game.tile import Tile


class Bag:
    def __init__(self):
        self.content = [(Tile(i, j, i*j)) for i in range(6) for j in range(6) for k in range(3)]


