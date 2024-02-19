from enum import Enum

from server.app.models.game.bag import Bag
from server.app.models.game.board import GameBoard
from server.app.models.game.move import Move
from server.app.models.game.player import Player


class Status(Enum):
    WAITING_FOR_START = 1
    IN_PROGRESS = 2,
    FINISHED = 3


class GameState:
    def __init__(self):
        self.player_turn = 0
        self.game_status = 1


class Game:
    def __init__(self, lobby):
        self.players = lobby.players
        self.board = GameBoard()
        self.bag = Bag()
        self.game_state = GameState()

    def game_over(self):
        if self.bag.content != 0:
            return False

        for player in self.players:
            if len(player.rack) != 0:
                return False

        self.game_state = Status.FINISHED

    def find_player_index(self, request_player_name):
        for i, player in enumerate(self.players):
            if player.name == request_player_name:
                return i

        return -1

    def start_game(self):
        self.game_state.player_turn = 0
        for player in self.players:
            for _ in range(6):
                player.draw_tile(self.bag)

    def process_move(self, received_move):
        move = Move(received_move)
        Move.construct_move(move, received_move)
        self.board.make_move(move.move)

        if not Move.is_combination_valid(move, move.move):
            return {"message": "invalid move! invalid combination"}, 0
        else:
            message, success = Move.is_move_valid_on_board(move, self.board)
            if not success:
                self.board.undo_move(move.move)
                return message, 0

        message, move_score = self.board.calculate_points(move.move)

        if move_score == 0:
            return message, False
        else:
            for tile in move.move.values():
                matching_tile = [t for t in self.players[self.game_state.player_turn].rack if t.id == tile.id]
                if matching_tile:
                    self.players[self.game_state.player_turn].rack.remove(matching_tile[0])
                else:
                    return {"message": "something has gone terribly wrong..."}, 0

            return message, move_score

    def game_loop(self):  # todo wtf is that name
        while not self.game_over():
            for player in self.players:
                player.make_move()
