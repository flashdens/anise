import React, { createContext, useState, useCallback } from "react";
import { ILobby } from "@/components/GameIndex";

interface ILobbyContext {
    lobby: ILobby;
    setLobby: (lobby: ILobby) => void;
}


const defaultContext: ILobbyContext = {
    lobby: undefined,
    setLobby: () => {},
};

export const LobbyContext = createContext<ILobbyContext>(defaultContext);

export function LobbyProvider({ children }: { children: React.ReactNode }) {
    const [lobby, setLobbyState] = useState<ILobby | undefined>(undefined);

    const setLobby = useCallback((newLobby: ILobby) => {
        setLobbyState(newLobby);
    }, []);

    return (
        <LobbyContext.Provider value={{ lobby, setLobby }}>
            {children}
        </LobbyContext.Provider>
    );
}
