import { createSlice } from '@reduxjs/toolkit';

// initial state values
const initialState = {
  basketData: [],
};

// creating a new slice
const clientBasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketData: (state, action) => {
      state.basketData = action.payload;
    },
  },
});

export const { setBasketData } = clientBasketSlice.actions;

export default clientBasketSlice.reducer;
