import React from "react";

interface RackVisibilityButtonProps {
    changeRackVisibility: () => void
    isRackVisible: boolean
}

const RackVisibilityButton = (props: RackVisibilityButtonProps) => {
    return (
         <button
            onClick={props.changeRackVisibility}
            className={`fixed bottom-16 left-1/2 -translate-x-1/2 px-4 py-2 text-xs border rounded`}
          >
             <svg className={"h-6 w-6"} viewBox="0 0 330 330" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                 <path className={"fill-black dark:fill-white"} d="m325.606 100.607-150.004 150a14.997 14.997 0 0 1-21.213 0l-149.996-150c-5.858-5.859-5.858-15.356 0-21.214 5.857-5.857 15.355-5.858 21.213 0l139.39 139.393L304.393 79.393A14.953 14.953 0 0 1 315 75a14.95 14.95 0 0 1 10.607 4.394c5.857 5.858 5.857 15.355-.001 21.213z"/>
             </svg>
          </button>
    )
}

export default RackVisibilityButton;