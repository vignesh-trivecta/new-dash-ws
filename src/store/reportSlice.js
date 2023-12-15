import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

// initial state values
const initialState = {
    customerId: "",
    broker: "",
    dateType: "custom",
    startDate: yesterday,
    endDate: yesterday,
    toggle: false,
    adminLogin: false,
    reportType: '',
    data: [],
    path: '',
    status: "",
    message: "",
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
            state.broker = action.payload;
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
        setReportType: (state, action) => {
            state.reportType = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setPath: (state, action) => {
            state.path = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    }
});

export const { setCustomerId, setBroker, setDateType, setStartDate, setEndDate, setToggle, setAdminLogin, setReportType, setData, setPath, setStatus, setMessage } = reportSlice.actions;

export default reportSlice.reducer;
