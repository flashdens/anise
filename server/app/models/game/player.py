import random
import models.game.bag
from models.game.move import Move
from models.game.tile import Tile


class Player:

    def __init__(self, name="Anon"):
        self.name = name
        self.score = 0
        self.rack = []

    def draw_tile(self, bag):
        self.rack.append(bag.content.pop())

    def rack_to_dict(self):
        return [tile.to_dict() for tile in self.rack]

    def to_dict(self):
        return {
            'name': self.name,
            'score': self.score
        }
