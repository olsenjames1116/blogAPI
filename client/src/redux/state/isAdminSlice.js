import { createSlice } from '@reduxjs/toolkit';

// Determines if a user is an admin to conditionally render admin privileges.
export const isAdminSlice = createSlice({
	name: 'isAdmin',
	initialState: {
		value: false,
	},
	reducers: {
		makeAdmin: (state) => {
			return { ...state, value: true };
		},
		removeAdmin: (state) => {
			return { ...state, value: false };
		},
	},
});

export const { makeAdmin, removeAdmin } = isAdminSlice.actions;
export default isAdminSlice.reducer;
