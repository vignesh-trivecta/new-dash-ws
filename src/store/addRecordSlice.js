import { createSlice } from '@reduxjs/toolkit';

// initial state values
const initialState = {
    recId: "",
    selectedStock: "",
    exchange: "",
    transType: "",
    orderType: "",
    weightage: null,
    quantity: null,
    price: null,
    newBasketName: '',
};

// creating a new slice
const addRecordSlice = createSlice({
  name: 'add',
  initialState,
  reducers: {
    setRecId: (state, action) => {
      state.recId = action.payload;
    },
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    setInstrumentName: (state, action) => {
      state.instrumentName = action.payload;
    },
    setExchange: (state, action) => {
      state.exchange = action.payload;
    },
    setTransType: (state, action) => {
      state.transType = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setWeightage: (state, action) => {
      state.weightage = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setNewBasketName: (state, action) => {
      state.newBasketName = action.payload;
    },
  },
});

export const { setRecId, setSelectedStock, setInstrumentName, setExchange, setTransType, setOrderType, setWeightage, setQuantity, setPrice, setNewBasketName } = addRecordSlice.actions;

export default addRecordSlice.reducer;
