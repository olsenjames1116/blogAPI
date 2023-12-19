import { createSlice } from '@reduxjs/toolkit';

// Determines if a user is logged in or not to conditionally display components.
export const isLoggedInSlice = createSlice({
	name: 'isLoggedIn',
	initialState: {
		value: false,
	},
	reducers: {
		logIn: (state) => {
			state.value = !state.value;
		},
		logOut: (state) => {
			state.value = !state.value;
		},
	},
});

export const { logIn, logOut } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
