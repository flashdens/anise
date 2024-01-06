from app.models.tile import Tile


class GameBoard:
    def __init__(self):
        self.board = []

    def __repr__(self):
        for i in range(6):  # todo max_col
            for j in range(6):  # todo max_row
                print(self.board[i][j])

    def get_tile(self, row: int, col: int) -> Tile:
        return self.board[row][col].get()

    def place_tile(self, tile: Tile, row: int, col: int) -> None:
        self.adjust_board_size(self, row, col)
        self.board[row][col] = tile

    def adjust_board_size(self, row, col):

        old_rows = len(self.board)
        old_cols = len(self.board[0])

        while row < 0:
            self.board = [None for _ in range(old_cols)] + self.board
            row += 1

        while row > old_rows:
            self.board += [None for _ in range(old_cols)]
            row -= 1

        while col < 0:
            for i in range(len(self.board)):
                self.board[i].insert(0, None)
            col += 1

        while col > len(self.board):
            for i in range(len(self.board)):
                self.board[i].insert(len(self.board[i]), None)
            row -= 1

