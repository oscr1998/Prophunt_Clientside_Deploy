import { createSlice, current } from "@reduxjs/toolkit";

export const flaskSlice = createSlice({
    name: 'flask',
    initialState: {
        URI: 'https://revelio-python-flask-server.onrender.com/',
    },
    reducers: {

    },
})

export const {  } = flaskSlice.actions

export default flaskSlice.reducer

