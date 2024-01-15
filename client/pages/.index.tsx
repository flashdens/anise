import React, {useEffect, useState} from "react";

const index = () => {

    const [message, setMessage] = useState("Loading");

    useEffect(() => {
        fetch("http://localhost:8080/api/home")
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
        });
    })
    return <div>
        {message}
        </div>
}

export default index;
/*

interface tile  {
    shape: string,
    color: number
}

const Tile = ({tile} : {tile : tile}) => {
    return(
    <div className={`tile flex border border-green-500 w-10 h-10 items-center justify-center bg-${tile.color}`}>
        {tile.shape}
    </div>
    )
}

const Rack = ({tiles} : {tiles: any}) => {
    return(
  <div className="rack flex space-x-1.5">
    {tiles.map((tile : any, index : any) => (
      <Tile key={index} tile={tile}/>
    ))}
  </div>
    )};

const App = () => {
    const myTiles : object = [{'☘', 2}, 'B', 'C', 'D']

    return (
        <div>
            <h1>HEJ</h1>
            <Rack tiles={myTiles} />
        </div>
    )
}

export default App;
 */