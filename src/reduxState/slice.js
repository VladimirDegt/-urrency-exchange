import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrencyThunk, fetchChangeCurrency } from './thunk';

export const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
  },
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBaseCurrencyThunk.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })
      .addCase(fetchBaseCurrencyThunk.rejected, (state, { payload }) => {
        if (payload.haveBaseCurrency) {
          return state;
        }
        state.baseCurrency = 'USD';
      })
      .addCase(fetchChangeCurrency.pending, state => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(fetchChangeCurrency.fulfilled, (state, { payload }) => {
        state.exchangeInfo = payload;
        state.isLoading = false;
      })
      .addCase(fetchChangeCurrency.rejected, (state, { payload }) => {
        state.exchangeInfo = null;
        state.isLoading = false;
        state.isError = payload;
      });
  },
});
export const currencyReducer = slice.reducer;

export const { setBaseCurrency } = slice.actions;
