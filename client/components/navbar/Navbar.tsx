import React, {useEffect, useState} from "react";
import Image from "next/image";
import DarkModeSVG from "@/components/navbar/buttons/DarkModeSVG";
import LightModeSVG from "@/components/navbar/buttons/LightModeSVG";

const Navbar: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (darkMode)
            document.documentElement.classList.add("dark");
        else
            document.documentElement.classList.remove("dark");

    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav className="px-4 py-2 border border-black dark:border-white">
            <div className="container mx-auto flex items-center justify-between">
                <h1>aniseNavbar</h1>
                <button onClick={toggleDarkMode}>
                    {
                        darkMode ?
                            <LightModeSVG/>
                            :
                            <DarkModeSVG/>
                    }
                </button>
            </div>
        </nav>
    );
}

export default Navbar;