import Link from "next/link"
const GameOverPopup = ({ winner }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold">Game over!</h2>
        <p className="mt-4">Winner: {winner.name}</p>
           <div className="mt-4">
          <Link href="/lobby">
              <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Return to lobby list
                </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOverPopup;