import Link from "next/link";

const JoinLobbyButton = () => {
    return (
        <div className="w-1/2 pb-2">
            <Link href={"/lobby"}>
                <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Join an existing lobby
                </button>
            </Link>
            </div>
    );
};

export default JoinLobbyButton;