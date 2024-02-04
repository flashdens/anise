import random
import server.app.models.game.bag
from server.app.models.game.move import Move
from server.app.models.game.tile import Tile


class Player:

    def __init__(self, name="Anon"):
        self.name = name
        self.score = 0
        self.rack = []

    def draw_tile(self, bag):
        self.rack.append(random.choice(bag.content.pop()))

    def to_dict(self):
        return {
            'name': self.name,
            'score': self.score,
            'rack': self.rack,
        }


