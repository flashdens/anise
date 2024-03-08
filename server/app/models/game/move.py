
from models.game.tile import Tile
from models.game.board import BOARD_SIZE


class Move:

    def __init__(self):
        self.move = {}
        self.is_move_valid = False

    def construct_move_from_json(self, received_move):
        for tile in received_move:
            i = int(tile['i'])
            x = tile['i'] // BOARD_SIZE
            y = i - x * BOARD_SIZE
            self.move[(x, y)] = Tile(tile['tile']['color'], tile['tile']['symbol'], tile['tile']['id'])

    def is_combination_valid(self, move):
        if len(move) == 0:
            assert False  # no move submitted to this method should be empty

        seen_tiles = set()
        for tile in move.values():
            tile_signature = (tile.symbol, tile.color)
            if tile_signature in seen_tiles:
                self.is_move_valid = False
                return self.is_move_valid
            seen_tiles.add(tile_signature)

        colors = {tile.color for tile in move.values()}
        symbols = {tile.symbol for tile in move.values()}
        self.is_move_valid = (len(colors) == 1 or len(symbols) == 1)

        return self.is_move_valid

    def construct_line(self, entry_x, entry_y, is_horizontal, board):
        entry_line = Move().move
        entry_line[(entry_x, entry_y)] = board[entry_x][entry_y]

        x = entry_x
        y = entry_y

        if not is_horizontal:
            while board[x + 1][y] is not None:
                entry_line[(x + 1, y)] = board[x + 1][y]
                x = x + 1
        else:
            while board[x][y + 1] is not None:
                entry_line[(x, y + 1)] = board[x][y + 1]
                y = y + 1

        x = entry_x
        y = entry_y

        if not is_horizontal:
            while board[x - 1][y] is not None:
                entry_line[(x - 1, y)] = board[x - 1][y]
                x = x - 1
        else:
            while board[x][y - 1] is not None:
                entry_line[(x, y - 1)] = board[x][y - 1]
                y = y - 1

        return entry_line

    def is_move_valid_on_board(self, board):
        if len(self.move) == 0:
            return {'message': "A move can't be empty!"}, False


        first_tile = list(self.move.items())[0]
        last_tile = list(self.move.items())[-1]

        first_tile_row = first_tile[0][0]
        first_tile_col = first_tile[0][1]

        last_tile_row = last_tile[0][0]
        last_tile_col = last_tile[0][1]

        row_len = abs(last_tile_row - first_tile_row)

        # there might be a bug, if len == 1 i should try looking both sides
        is_horizontal_move = True if row_len == 0 else False
        neighbour_found = False

        # check if the move is a line
        if abs(last_tile_row - first_tile_row) not in (0, len(self.move) - 1) \
                and abs(last_tile_col - first_tile_col) not in (0, len(self.move) - 1):
            return {'message': 'The move must be a vertical or horizontal line!'}, False

        if board.empty:
            if (25, 25) not in self.move:
                return {'meesage': 'The first move needs to be made in the board center!'}, False

        entry_line = self.construct_line(first_tile_row,
                                         first_tile_col,
                                         is_horizontal_move,
                                         board.board)

        if len(entry_line) - len(self.move) > 0:
            neighbour_found = True

        if not self.is_combination_valid(entry_line):
            return {'message': "Combination is not valid!"}, False

        for coords, tile in entry_line.items():
            insert_line = self.construct_line(coords[0],
                                              coords[1],
                                              not is_horizontal_move,
                                              board.board)

            if not self.is_combination_valid(insert_line):
                return {'message': "Insertion is not valid!"}, False

            if len(insert_line) > 1:
                neighbour_found = True

        if board.empty:
            board.empty = False
            return {'message': "move is valid!"}, True
        elif not neighbour_found:
            return {'message': "tiles in your move must be adjacent to at least one tile!"}, False
        else:
            return {'message': "move is valid!"}, True
