import { configureStore } from '@reduxjs/toolkit';
import isLoggedInReducer from './state/isLoggedInSlice';

export default configureStore({
	reducer: {
		isLoggedIn: isLoggedInReducer,
	},
});
