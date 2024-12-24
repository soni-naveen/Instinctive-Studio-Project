import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  loading: false,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
  },
});

export const { setStudents, setLoading, addStudent, deleteStudent } =
  studentsSlice.actions;

export default studentsSlice.reducer;
