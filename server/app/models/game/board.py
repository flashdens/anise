from server.app.models.game.tile import Tile

BOARD_SIZE = 51


class GameBoard:

    def __init__(self):
        self.board = [[None for _ in range(50)] for _ in range(50)]
        self.empty = True

    def get_tile(self, row: int, col: int) -> Tile:
        return self.board[row][col].get()

    def place_tile(self, tile, row, col) -> None:
        self.board[row][col] = tile

    def remove_tile(self, row, col) -> None:
        self.board[row][col] = None

    def score_combination(self, x, y, is_horizontal):
        combination_len = 0

        if not is_horizontal:
            while self.board[x + 1][y] is not None:
                x = x + 1
        else:
            while self.board[x][y + 1] is not None:
                y = y + 1

        while self.board[x][y]:
            combination_len = combination_len + 1
            if not is_horizontal:
                x = x - 1
            else:
                y = y - 1

        return combination_len if combination_len < 6 else 12

    def calculate_points(self, move):
        score = 0
        first_tile = list(move.items())[0]
        last_tile = list(move.items())[-1]

        first_tile_row = first_tile[0][0]
        first_tile_col = first_tile[0][1]

        last_tile_row = last_tile[0][0]
        last_tile_col = last_tile[0][1]

        row_len = abs(last_tile_row - first_tile_row)

        is_horizontal_move = True if row_len == 0 else False

        # check if the move is a line
        if abs(last_tile_row - first_tile_row) not in (0, len(move) - 1) \
                and abs(last_tile_col - first_tile_col) not in (0, len(move) - 1):
            return {'message': 'The move must be a vertical or horizontal line!'}, 0

        entry_score = self.score_combination(first_tile_row,
                                             first_tile_col,
                                             is_horizontal_move)

        if entry_score > 1:
            score += entry_score

        for coords, tile in move.items():
            insert_score = self.score_combination(coords[0],
                                                  coords[1],
                                                  not is_horizontal_move)
            if insert_score > 1:
                score += insert_score

        return {'message': 'It works!'}, score

    def make_move(self, move):
        for key, value in move.items():
            row, col = key[0], key[1]
            self.place_tile(value, row, col)

    def undo_move(self, move):
        for key, value in move.items():
            row, col = key[0], key[1]
            self.remove_tile(row, col)

