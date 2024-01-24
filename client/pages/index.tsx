import React, {useState, useEffect} from "react";

import BoardContainer, {IMove} from "@/components/board/BoardContainer";
import Rack from "@/components/rack/Rack";
import Navbar from '@/components/navbar/Navbar'
import Scoreboard from '@/components/scoreboard/Scoreboard'

import {ITile} from "@/components/Tile";



const Index = () => {
    const [playerTiles, setPlayerTiles] = useState<ITile[]>([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/draw")
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error("error fetching response");
                }
                return response.json();
            })
            .then((data: ITile[]) => {
                setPlayerTiles(data);
            })
            .catch((error: Error) => {
                console.error('Error - ', error)
            });
    }, []);


    const [move, setMove] = useState<IMove[]>([]);
    const [dragged, setDragged] = useState<ITile|null>(null);
    const [rackTiles, setRackTiles] = useState<ITile[]>(playerTiles);


    useEffect(() => { // todo
        setRackTiles(playerTiles)
    }, [playerTiles]);
    return (
        <div className={"root"}>
            <Navbar/>
            <div className={"flex flex-row"}>
            <BoardContainer move={move} setMove={setMove} setDragged={setDragged} dragged={dragged} setRackTiles={setRackTiles}/>
            <Scoreboard/>
            </div>
            <Rack initTiles={playerTiles} move={move} setMove={setMove} dragged={dragged} setDragged={setDragged} rackTiles={rackTiles} setRackTiles={setRackTiles}/>
        </div>
    );
};

export default Index;