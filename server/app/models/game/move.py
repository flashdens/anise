from server.app.models.game.tile import Tile


class Move:

    def __init__(self):
        self.content = {}
        self.is_move_valid = False

    # def build_move(self, foo: list[tuple[Tile, (int, int)]]):

