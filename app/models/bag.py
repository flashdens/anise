from app.models.tile import Tile


class Bag:
    def __init__(self):
        self.content = [(Tile(i, j)) for i in range(6) for j in range(6) for _ in range(3)]


