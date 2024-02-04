from server.app.models.game.game import Game

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
            "players": [player.to_dict() for player in self.players]
        }

    def start_game(self):
        pass
