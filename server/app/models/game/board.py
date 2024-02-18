from server.app.models.game.tile import Tile

BOARD_SIZE = 51


class GameBoard:

    def __init__(self):
        self.board = [[None for _ in range(50)] for _ in range(50)]

    def get_tile(self, row: int, col: int) -> Tile:
        return self.board[row][col].get()

    def place_tile(self, tile, row, col) -> None:
        self.board[row][col] = tile

    def calculate_points(self, move):
        score = 0
        first_tile = list(move.items())[0]
        last_tile = list(move.items())[-1]

        first_tile_row = first_tile[0][0]
        first_tile_col = first_tile[0][1]

        last_tile_row = last_tile[0][0]
        last_tile_col = last_tile[0][1]

        # check if the move is a line
        if abs(last_tile_row - first_tile_row) not in (0, len(move) - 1) \
                and abs(last_tile_col - first_tile_col) not in (0, len(move) - 1):
            return {'message': 'The move must be a vertical or horizontal line!'}, 0

        # check if tiles were placed near non-matching tiles
        for coords, tile in move.items():
            dirs = ((0, 1), (0, -1), (1, 0), (-1, 0))
            local_count = 1

            for dir in dirs:
                checked_x, checked_y = coords[0] + dir[0], coords[1] + dir[1]

                # don't check tiles which are a part of a move
                if (checked_x, checked_y) in move:
                    continue

                if self.board[checked_x][checked_y] is None:
                    continue

                # completely different tile
                if self.board[checked_x][checked_y].color != tile.color \
                        and self.board[checked_x][checked_y].symbol != tile.symbol:
                    return 0

                # duplicate - also not allowed
                if self.board[checked_x][checked_y].color == tile.color \
                        and self.board[checked_x][checked_y].symbol == tile.symbol:
                    return 0

                '''
                if it matches, then the tricky part comes in - we need to check
                if the newly formed line is compatible with the old one
                '''
                if self.board[checked_x][checked_y].color == tile.color \
                        or self.board[checked_x][checked_y].symbol == tile.symbol:
                    local_count += 1
                    # first, determine if the line is vertical or horizontal
                    checked_x, checked_y = checked_x + dir[0], checked_y + dir[1]
                    while self.board[checked_x][checked_y] is not None:

                        if checked_x < 0 or checked_x > BOARD_SIZE or checked_y < 0 or checked_y > BOARD_SIZE:
                            continue
                        # completely different tile
                        if self.board[checked_x][checked_y].color != tile.color \
                                and self.board[checked_x][checked_y].symbol != tile.symbol:
                            return 0

                        # duplicate - also not allowed
                        if self.board[checked_x][checked_y].color != tile.color \
                                and self.board[checked_x][checked_y].symbol != tile.symbol:
                            return 0

                        checked_x, checked_y = checked_x + dir[0], checked_y + dir[1]

                    local_count += 1

                    if local_count == 7:
                        return {'message': "Lines can include only up to 6 tiles!"}, 0

            # todo this won't work for moves which are only dokładki
            score += 12 if local_count == 6 else 0

        score += 12 if len(move) == 6 else abs()

        return {'message': 'It works!'}, score

    def make_move(self, move):
        for key, value in move.items():
            row, col = key[0], key[1]
            self.place_tile(value, row, col)
