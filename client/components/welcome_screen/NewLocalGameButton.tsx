import Link from "next/link";

const NewLocalGameButton = () => {
  return (
    <div className="w-1/2 pb-2">
            <Link href={"/lobby_list"}>
                <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Play locally
                </button>
            </Link>
            </div>
    );
}

export default NewLocalGameButton;