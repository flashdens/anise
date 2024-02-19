import Head from 'next/head'
import LobbyList from "@/components/lobby_list/LobbyList"

const index = () => {
    return (
    <>
      <Head>
        <title>Lobby List</title>
      </Head>

        <div className="p-4">
            <div className="container flex flex-col justify-between items-center border text-center max-w-lg mx-auto">
                <LobbyList/>
            </div>
        </div>
    </>
    )
}

export default index;