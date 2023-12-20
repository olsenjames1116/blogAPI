import { configureStore } from '@reduxjs/toolkit';
import isLoggedInReducer from './state/isLoggedInSlice';
import isAdminReducer from './state/isAdminSlice';

export default configureStore({
	reducer: {
		isLoggedIn: isLoggedInReducer,
		isAdmin: isAdminReducer,
	},
});
