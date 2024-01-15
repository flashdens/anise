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