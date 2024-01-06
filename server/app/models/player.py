import random
import bag
from server.app.models.move import Move
from server.app.models.tile import Tile


class Player:

    def __init__(self, name="Anon"):
        self.name = name
        self.score = 0
        self.rack = []

    def draw_tile(self, bag: bag.Bag):
        self.rack.append(random.choice(bag.content.pop()))

    def make_move(self, move: list[Tile]) -> Move:
        player_move = Move()
        # dynamically construct the move dict using signals coming from the GUI...
        # the GUI also needs to check if two tiles can be placed next to each other, if it's not too hard to do
        # finally, if a move is submitted, check if it's valid and return it to the board to place
        return player_move


