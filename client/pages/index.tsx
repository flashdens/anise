import React, {useState, useEffect} from "react";

import BoardContainer from "@/components/board/BoardContainer";
import Rack from "@/components/rack/Rack";
import {ITile} from "@/components/rack/Tile";

const index = () => {
    const [tiles, setTiles] = useState<ITile[]>([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/draw")
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error("error fetching response");
                }
                return response.json();
            })
            .then((data: ITile[]) => {
                setTiles(data);
            })
            .catch((error: Error) => {
                console.error('Error - ', error)
            });
    }, []);
    console.log(tiles);
    return (
        <>
            <h1 className={"text-orange-800"}>HEJ</h1>
            <BoardContainer />

            <Rack initTiles={tiles}/>
        </>
    );
};

export default index;