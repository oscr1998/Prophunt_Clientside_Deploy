import { createSlice, current } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        URI: "https://revelio.onrender.com/",
        socket: null,
        roomID: "",
        isHost: null,
        gameInfo: {
            // map: 0,
            // gameMode: 0,
            // roomSize: 2,
        },
        players: {
            // id1: { id: "", username: "", character: "", sprite: "" },
            // id2: { id: "", username: "", character: "", sprite: "" },
        },
    },
    reducers: {
        store_socket: ( state, action ) => {
            state.socket = action.payload
        },
        store_roomInfo: (state, action) => {
            state.roomID = action.payload.roomID
            state.isHost = action.payload.isHost
        },
        update_players: (state, action) => {
            state.players = action.payload
        },
        store_gameInfo: (state, action) => {
            state.gameInfo = action.payload
        }
    },
})

export const { store_socket, store_roomInfo, update_players, store_gameInfo } = socketSlice.actions

export default socketSlice.reducer

