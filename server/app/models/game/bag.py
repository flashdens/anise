import random

from server.app.models.game.tile import Tile

possible_symbols = ['A', 'B', 'C', 'D', 'E', 'F']
possible_colors = ['red', 'green', 'yellow', 'blue', 'purple', 'cyan']

class Bag:
    def __init__(self):
        self.content = []
        id_gen = 0
        for i in range(6):
            for j in range(6):
                for k in range(3):
                    self.content.append(Tile(possible_colors[i], possible_symbols[j], id_gen))
                    id_gen += 1
        random.shuffle(self.content)
