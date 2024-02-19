from shutil import move

from server.app.models.game.tile import Tile
from server.app.models.game.board import BOARD_SIZE

class Move:

    def __init__(self, received_move):
        self.move = {}
        self.is_move_valid = False

    def construct_move(self, received_move):
        for tile in received_move:
            i = int(tile['i'])
            x = tile['i'] // BOARD_SIZE
            y = i - x * BOARD_SIZE
            self.move[(x, y)] = Tile(tile['tile']['color'], tile['tile']['symbol'], tile['tile']['id'])

    def is_combination_valid(self, move):
        colors = {tile.color for tile in move.values()}
        symbols = {tile.symbol for tile in move.values()}

        self.is_move_valid = (len(colors) == 1 or len(symbols) == 1)
        return self.is_move_valid

    def is_move_valid_on_board(self, board):
        first_tile = list(self.move.items())[0]
        last_tile = list(self.move.items())[-1]

        first_tile_row = first_tile[0][0]
        first_tile_col = first_tile[0][1]

        last_tile_row = last_tile[0][0]
        last_tile_col = last_tile[0][1]

        # check if the move is a line
        if abs(last_tile_row - first_tile_row) not in (0, len(self.move) - 1) \
                and abs(last_tile_col - first_tile_col) not in (0, len(self.move) - 1):
            return {'message': 'The move must be a vertical or horizontal line!'}, False

        if board.empty:
            if (25, 25) not in self.move:
                return {'meesage': 'The first move needs to be made in the board center!'}, False

        for coords, tile in self.move.items():
            if board.board[coords[0]][coords[1]] is not None:
                return {'message': "Tiles can't be overwritten!"}, False

            directions = ((0, -1), (1, 0), (0, 1), (-1, 0))
            for direction in directions:
                checked_x, checked_y = coords[0] + direction[0], coords[1] + direction[1]
                if board.board[checked_x][checked_y] is not None:
                    return {'message': "move is valid!"}, True

        if board.empty:
            board.empty = False
            return {'message': "move is valid!"}, True
        else:
            return {'message': "tiles in your move must be adjacent to at least one tile!"}, False





