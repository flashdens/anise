from models.game.game import Game

lobbies = []


class Lobby:

    def __init__(self, name: str = "Lobby", host: str = "miloszek"):
        self.id = len(lobbies) + 1
        self.name = name
        self.host = host
        self.players = []
        self.game = Game(self)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "host": self.host,
            "players": [player.to_dict() for player in self.players],
            "toMove": self.game.game_state.player_turn,
            "gameStatus": self.game.game_state.game_status,
            "board": [[tile.to_dict() if tile else None for tile in row] for row in self.game.board.board]
        }
