import { createSlice } from "@reduxjs/toolkit";

// initial state values
const initialState = {
    tab: 1,
    basketState: false,
}

// creating new slice
const evnetSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setTab: (state, action) => {
            state.tab = action.payload;
        },
        setBasketState: (state, action) => {
            state.basketState = action.payload;
        },
    }
});

export const { setTab, setBasketState } = evnetSlice.actions;

export default evnetSlice.reducer;