import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TCategory } from '../../models/categories';

type TCategoriesState = {
    categories: TCategory[],
    isCategoriesLoading: boolean,
    categoriesError?: string,
};

const initialState: TCategoriesState = {
    categories: [],
    isCategoriesLoading: false,
    categoriesError: undefined,
};

export const fetchCategories = createAsyncThunk<TCategory[], undefined, { rejectValue: string }>(
    'fetchCategories',
    async (_, thunkAPI) => {
        try{
            const response = await axios.get<{categories: TCategory[]}>('https://express-shina.ru/vacancy/catalog');
            if (!response.data) {
                throw new Error('He удалось загрузить категории с сервера!');
            }
            return response.data.categories;
        } catch(error) {
            console.log(error)
            return thunkAPI.rejectWithValue('Что-то пошло не так!');
        }
    }
);

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
          state.isCategoriesLoading = true;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.isCategoriesLoading = false;
            state.categories = action.payload;
            state.categoriesError = undefined ;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.categories = [];
            state.isCategoriesLoading = false;
            state.categoriesError = action.payload;
        })
    }
});

export default CategoriesSlice.reducer;
