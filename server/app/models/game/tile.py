class Tile:

    def __init__(self, color, symbol, id):
        self.color = color
        self.symbol = symbol
        self.id = id

    possible_symbols = ['●', '■', '◆', '★', '☘', '✘']
    possible_colors = ['red', 'green', 'yellow', 'blue', 'purple', 'cyan']

    def __repr__(self):

        build_me = ""

        """
        {0} red = '\033[91m'
        {1} green = '\033[92m'
        {2} yellow = '\033[93m'
        {3} blue = '\033[94m'
        {4} purple = '\033[95m'
        {5} cyan = '\033[96m' # cyan instead of orange - it's an ANSI escape seq
        """

        match self.color:
            case 0:
                build_me += '\033[91m'

            case 1:
                build_me += '\033[92m'

            case 2:
                build_me += '\033[93m'

            case 3:
                build_me += '\033[94m'

            case 4:
                build_me += '\033[95m'

            case 5:
                build_me += '\033[96m'

            # case 0:
            #     build_me += '●'
            #
            # case 1:
            #     build_me += '■'
            #
            # case 2:
            #     build_me += '◆'
            #
            # case 3:
            #     build_me += '★'
            #
            # case 4:
            #     build_me += '☘'
            #
            # case 5:
            #     build_me += '✘'

        build_me += self.symbol + '\033[0m'  # reset color

        return build_me
