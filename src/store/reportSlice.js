import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

// initial state values
const initialState = {
    customerId: "CUST001 - Muthu Kumar",
    borker: "AXIS",
    dateType: "today",
    startDate: yesterday,
    endDate: yesterday,
    toggle: false,
    adminLogin: false,
}

// creating new slice
const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: { 
        setCustomerId: (state, action) => {
            state.customerId = action.payload;
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
        setAdminLogin: (state, action) => {
            state.adminLogin = action.payload;
        },
    }
});

export const { setCustomerId, setBroker, setDateType, setStartDate, setEndDate, setToggle, setAdminLogin } = reportSlice.actions;

export default reportSlice.reducer;