import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency } from 'service/exchangeAPI';
import { getUserInfo } from 'service/opencagedataApi';

export const fetchBaseCurrencyThunk = createAsyncThunk(
  'fetchBaseCurrency',
  async (coords, thunkAPI) => {
    const { currency } = thunkAPI.getState();
    console.log(currency);

    if (currency.baseCurrency) {
      return thunkAPI.rejectWithValue({
        message: 'we already have the best currency',
        haveBaseCurrency: true,
      });
    }

    try {
      const data = await getUserInfo(coords);
      return data.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchChangeCurrency = createAsyncThunk(
  'fetchChangeCurrency',
  async (credentials, thunkAPI) => {
    try {
      const data = await exchangeCurrency(credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
