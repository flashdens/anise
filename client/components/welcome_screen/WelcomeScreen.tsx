import NewLobbyButton from "@/components/welcome_screen/NewLobbyButton";
import JoinLobbyButton from "@/components/welcome_screen/JoinLobbyButton";
import HowToPlayButton from "@/components/welcome_screen/HowToPlayButton";
import JoinByCode from "@/components/welcome_screen/JoinByCode";
import NewLocalGameButton from "@/components/welcome_screen/NewLocalGameButton";

const WelcomeScreen = () => {
    return (
        <div className="p-4">
            <div className="container flex flex-col justify-between items-center border text-center max-w-lg mx-auto">
                <h1 className="py-2 text-xl">anise</h1>
                <p className={"pb-2 text-sm"}>Play Qwirkle online with your friends!</p>
                <JoinLobbyButton/>
                <NewLobbyButton/>
                <JoinByCode/>
                <div className={"py-2"}></div>
                <div className={"border-t border-gray-300  w-[60%] py-3"}></div>
                <HowToPlayButton/>
            </div>
        </div>
    );
}

export default WelcomeScreen;