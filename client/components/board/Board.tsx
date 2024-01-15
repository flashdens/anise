const Board = () => {
    const boardSize: number = 216;
    const rows: number[] = Array.from({length: boardSize});

    return (
        <div className="board">
            { rows.map((_, rowIndex) => (
                <div key={rowIndex} className="row">
                    {rows.map((_, colIndex) => (
                            <div key={colIndex} className="square"></div>
                    ))}
                </div>
            ))}
        </div>
    );
};


