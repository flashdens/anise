import React from "react";

const SubmitMoveButton = () => {
    console.log("hello from move button component");
   return (
       <button className="px-4 py-1 text-xs transition-colors duration-300 rounded-full shadow-xl text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100">
           submit move
       </button>
   )
}

export default SubmitMoveButton;