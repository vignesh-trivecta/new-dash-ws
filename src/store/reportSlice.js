import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

// initial state values
const initialState = {
    clientCode: "CUST001 - Muthu Kumar",
    borker: "AXIS",
    dateType: "today",
    startDate: yesterday,
    endDate: yesterday,
    toggle: false,
}

// creating new slice
const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setClientCode: (state, action) => {
            state.clientCode = action.payload;
        },
        setBroker: (state, action) => {
            state.borker = action.payload;
        },
        setDateType: (state, action) => {
            state.dateType = action.payload;
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setToggle: (state, action) => {
            state.toggle = action.payload;
        },
    }
});

export const { setClientCode, setBroker, setDateType, setStartDate, setEndDate, setToggle } = reportSlice.actions;

export default reportSlice.reducer;