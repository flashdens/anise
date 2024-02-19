import React, {useEffect, useState} from "react";
import DarkModeSVG from "@/components/navbar/buttons/DarkModeSVG";
import LightModeSVG from "@/components/navbar/buttons/LightModeSVG";
import {useDarkMode} from "@/context/DarkModeContext";

const Navbar: React.FC = () => {
    const { darkMode, setDarkMode } = useDarkMode();

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <nav className="px-4 py-2 border border-black dark:border-white overflow-hidden" suppressHydrationWarning={true}>
            {isClient ?
            <div className="container mx-auto flex items-center justify-between">
                <button onClick={toggleDarkMode}>
                    {
                        darkMode ?
                            <LightModeSVG/>
                            :
                            <DarkModeSVG/>
                    }
                </button>
            </div>
                : <h1>loading</h1>}
        </nav>
    );
}

export default Navbar;