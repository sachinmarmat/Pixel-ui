import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temporary: {
    title: "",
    location: "",
    salary: 0,
    jobtype: [],
    experience: "",
  },
  applied: {
    title: "",
    location: "",
    salary: 0,
    jobtype: [],
    experience: "",
  }, 
};

const jobSlice = createSlice({ 
  name: "job",
  initialState,
  reducers: {
    // Update temporary values as user types/selects
    updateTemporary: (state, action) => {
      const { field, value } = action.payload;
      state.temporary[field] = value;
    },
    toggleJobType: (state, action) => {
      const type = action.payload;
      if (state.temporary.jobtype.includes(type)) {
        state.temporary.jobtype = state.temporary.jobtype.filter(t => t !== type);
      } else {
        state.temporary.jobtype.push(type);
      } 
    },
    applyFilters: (state) => { 
      state.applied = { ...state.temporary }; // copy temp → applied
    },
  },
});
 
export const { updateTemporary, toggleJobType, applyFilters } = jobSlice.actions;
export default jobSlice.reducer;
