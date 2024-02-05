from server.app.models.game.tile import Tile
from server.app.models.game.board import BOARD_SIZE

class Move:

    def __init__(self, received_move):
        self.move = {}
        self.is_move_valid = False

    def construct_move(self, received_move):
        for tile in received_move:
            i = int(tile['i'])
            y = tile['i'] // BOARD_SIZE
            x = i - y * BOARD_SIZE
            self.move[(x, y)] = Tile(tile['tile']['color'], tile['tile']['symbol'], tile['tile']['id'])

    def is_combination_valid(self, move):
        print(move)
        colors = {tile.color for tile in move.values()}
        symbols = {tile.symbol for tile in move.values()}

        self.is_move_valid = (len(colors) == 1 or len(symbols) == 1)
        return self.is_move_valid

