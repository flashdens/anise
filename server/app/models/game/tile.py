class Tile:
    possible_symbols = ['●', '■', '◆', '★', '☘', '✘']
    possible_colors = ['red', 'green', 'yellow', 'blue', 'purple', 'cyan']

    def __init__(self, color, symbol, id):
        self.color = color
        self.symbol = symbol
        self.id = id

    def to_dict(self):
        return {
            'color': self.color,
            'symbol': self.symbol,
            'id': self.id
        }
