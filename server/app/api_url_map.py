import server.app.api.draw
import server.app.api.receive_move

def register_api_routes(app, blueprints):
    for blueprint in blueprints:
        app.register_blueprint(blueprint)
        print(blueprint, " registered!")
