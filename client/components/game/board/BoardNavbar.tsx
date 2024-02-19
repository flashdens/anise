import React from "react";

interface BoardNavbarProps {
    onCenter: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onZoomReset: () => void;
}

const BoardNavbar: React.FC<BoardNavbarProps> = (props: BoardNavbarProps) => {
  return (
      <div className={"bg-gray-500"}>
          <button onClick={props.onCenter}>
              <img src='/buttons/game/board_navbar/center.svg' height={20} width={20} alt=""/>
                Center board
          </button>
          <button onClick={props.onZoomIn}>
              <img src='/buttons/game/board_navbar/zoom-in.svg' height={20} width={20} alt=""/>
                Zoom in
          </button>
          <button onClick={props.onZoomOut}>
              <img src='/buttons/game/board_navbar/zoom-out.svg' height={20} width={20} alt=""/>
                Zoom out
          </button>
          <button onClick={props.onZoomReset}>
              <img src='/buttons/game/board_navbar/zoom-reset.svg' height={20} width={20} alt=""/>
                Reset zoom
          </button>
        </div>
  );
}

export default BoardNavbar;

