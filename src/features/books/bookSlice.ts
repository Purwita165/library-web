import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  id: string;
  title: string;
  author: string;
}

interface BookState {
  list: Book[];
}

const initialState: BookState = {
  list: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;
