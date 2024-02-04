from server.app.models.bag import Bag
from server.app.models.board import GameBoard
from server.app.models.player import Player


class Game:
    def __init__(self, players: list[Player]):
        self.players = players
        self.board = GameBoard()
        self.bag = Bag()

    def start_game(self):
        for player in self.players:
            for _ in range(6):
                player.draw_tile(self.bag)

    def game_over(self) -> bool:
        if self.bag.content != 0:
            return False

        for player in self.players:
            if len(player.rack) != 0:
                return False

        return True


    def game_loop(self): # todo wtf is that name

        while not self.game_over():
            for player in self.players:
                player.make_move()


