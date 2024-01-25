import Link from "next/link";

const JoinByCode = () => {
return (
    <div className={"py-2"}>
        <h2 className={"mb-2"}>Have a game code?</h2>
        <input className={"border border-black dark:border-white dark:bg-black text-xl"} name={"code"} size={4} maxLength={5}/>
        <Link href={"/lobby/join_game"}>
            <button className={"ml-2 px-2 bg-green-500 rounded-2xl"}>
                &gt;
            </button>
        </Link>
    </div>
    );
}

export default JoinByCode;