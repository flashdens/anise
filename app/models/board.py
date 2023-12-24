from app.models.tile import Tile


class GameBoard:
    def __init__(self):
        self.board = {}

    def __repr__(self):
        for i in range(6):  # todo max_col
            for j in range(6):  # todo max_row
                print(self.board[i][j])

    def get_tile(self, row: int, col: int) -> Tile:
        return self.board.get((row, col), None)

    def place_tile(self, tile: Tile, row: int, col: int) -> None:
        self.board[(row, col)] = tile
