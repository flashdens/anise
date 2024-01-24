import PlayerContainer from '@/components/scoreboard/PlayerContainer';

const Scoreboard = () => {
    const renderScoreboard = () => {
        const players: any[] = [];
        for (let i: number = 0; i < 4; ++i) {
            players.push(
                <>
                    {
                        <PlayerContainer
                        key={i}
                        />
                    }
                </>
            )
        }
            return players;
}

    return (
        <div className={"scoreboard"}>
        {renderScoreboard()}
        </div>
    );
}

export default Scoreboard;