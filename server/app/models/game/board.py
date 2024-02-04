from server.app.models.game.tile import Tile

BOARD_SIZE = 51


class GameBoard:

    def __init__(self):
        self.board = []

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

        last_tile_row = first_tile[1][0]
        last_tile_col = first_tile[1][1]

        # check if the move is a line
        if abs(last_tile_row - first_tile_row) not in (0, len(move) - 1) \
                or abs(last_tile_col - first_tile_col) not in (0, len(move) - 1):
            return {'message': 'The move must be a vertical or horizontal line!'}, 0

        # check if tiles were placed near non-matching tiles
        for coords, tile in move.items():
            dirs = ((0, 1), (0, -1), (1, 0), (-1, 0))
            local_count = 1

            for dir in dirs:
                checked_x, checked_y = coords + dir

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
                if self.board[checked_x][checked_y].color != tile.color \
                        and self.board[checked_x][checked_y].symbol != tile.symbol:
                    return 0

                '''
                if it matches, then the tricky part comes in - we need to check
                if the newly formed line is compatible with the old one
                '''
                if self.board[checked_x][checked_y].color == tile.color \
                        or self.board[checked_x][checked_y].symbol == tile.symbol:
                    local_count += 1
                    # first, determine if the line is vertical or horizontal
                    while self.board[checked_x][checked_y] is not None:
                        checked_x, checked_y = checked_x + dir[0], checked_y + dir[1]

                        # completely different tile
                        if self.board[checked_x][checked_y].color != tile.color \
                                and self.board[checked_x][checked_y].symbol != tile.symbol:
                            return 0

                        # duplicate - also not allowed
                        if self.board[checked_x][checked_y].color != tile.color \
                                and self.board[checked_x][checked_y].symbol != tile.symbol:
                            return 0

                    local_count += 1

                    if local_count == 7:
                        return {'message': "You broke somebody's Qwirkle!"}, 0

            # todo this won't work for moves which are only dokładki
            score += 12 if local_count == 6 else local_count

        score += 12 if len(move) == 6 else len(move)

        return {'message': 'It works!'}, score

    def make_move(self, move):
        for tile in move:
            row, col = move.keys()[move.values().index(tile)]
            self.place_tile(tile, row, col)
