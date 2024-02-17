import {LobbyProvider} from "@/context/LobbyContext";
import GameIndex from "@/components/GameIndex"
const Index = () => {

    return (
            <LobbyProvider>
                <GameIndex />
            </LobbyProvider>
    );
};

export default Index;

