import React from "react";

interface BoardNavbarProps {
    onCenter: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onZoomReset: () => void;
}

const BoardNavbar: React.FC<BoardNavbarProps> = (props: BoardNavbarProps) => {
  return (
      <div className="board-navbar flex absolute top-0 left-0 z-10 bg-white ">
          <button onClick={props.onCenter}>
              <img src='/buttons/center.svg' height={20} width={20} alt=""/>
                Center board
          </button>
          <button onClick={props.onZoomIn}>
              <img src='/buttons/zoom-in.svg' height={20} width={20} alt=""/>
                Zoom in
          </button>
          <button onClick={props.onZoomOut}>
              <img src='/buttons/zoom-out.svg' height={20} width={20} alt=""/>
                Zoom out
          </button>
          <button onClick={props.onZoomReset}>
              <img src='/buttons/zoom-out.svg' height={20} width={20} alt=""/>
                Reset zoom
          </button>
        </div>
  );
}

export default BoardNavbar;

