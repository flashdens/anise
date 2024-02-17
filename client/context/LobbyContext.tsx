import React, { createContext, useState, useCallback } from "react";
import { ILobby } from "@/components/GameIndex";

interface ILobbyContext {
    lobby: ILobby;
    setLobby: (lobby: ILobby) => void; // Update type to a more specific function signature
}

// Set the initial state of the context
const defaultContext: ILobbyContext = {
    lobby: undefined,
    setLobby: () => {}, // Initial dummy function
};

// Create the context with the default values
export const LobbyContext = createContext<ILobbyContext>(defaultContext);

export function LobbyProvider({ children }: { children: React.ReactNode }) {
    const [lobby, setLobbyState] = useState<ILobby | undefined>(undefined);

    // Custom setLobby function
    const setLobby = useCallback((newLobby: ILobby) => {
        // Here, you can add any custom logic you need
        console.log('Updating lobby state', newLobby);

        // Finally, update the state
        setLobbyState(newLobby);
    }, []);

    return (
        <LobbyContext.Provider value={{ lobby, setLobby }}>
            {children}
        </LobbyContext.Provider>
    );
}
