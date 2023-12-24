import random
import bag


class Player:

    def __init__(self, name="Anon"):
        self.name = name
        self.score = 0
        self.rack = []

    def draw_tile(self, bag: bag.Bag):
        self.rack.append(random.choice(bag.content))
