import Link from "next/link";

const NewLobbyButton = () => {
   return (
       <div className="py-2">
                <Link href={"/lobby/create"}>
                    <button className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                        Create a new lobby
                    </button>
                </Link>
            </div>
   );
};

export default NewLobbyButton;