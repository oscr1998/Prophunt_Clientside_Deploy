import React, { useEffect, useState } from 'react'
import { config } from '../../game/index'
import { IonPhaser } from '@ion-phaser/react'
import { Bounce } from 'react-reveal'
import './style.css'

import { useDispatch, useSelector } from 'react-redux'
import { Results } from '../../components'
import { store_roomInfo } from '../../actions/socket/socketSlice'

export default function Game() {

    const dispatch = useDispatch();

    const socket = useSelector(state => state.socket.socket)
    const room = useSelector(state => state.socket.roomID)
    const [resultsModal, setResultsModal] = useState(false)
    const [results, setResults] = useState("")

    useEffect(() => {
        socket.on("results", results => {
            setResultsModal(true)
            setResults(results)
            //!
            // socket.emit('exit-all-rooms')
            dispatch(store_roomInfo({ roomID: room, isHost: null }))
            console.log(results);
            //todo send results to backend
        })
    }, [])

    return (
        <div>
            <div id='gameContainer'>
                <Bounce top> <IonPhaser game={config} initialize={true} /> </Bounce>
            </div>
            {resultsModal? <Results handleClose={setResultsModal} results={results}/> : null}
        </div>

    )
}
