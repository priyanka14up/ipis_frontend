import { createAsyncThunk } from "@reduxjs/toolkit";



export const warnDiscard = createAsyncThunk(
    "app/warnDiscard",
    async (
        _args,
        thunkAPI
    ) => {
        try {
            return true;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);