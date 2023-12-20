import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { makeAdmin } from '../../redux/state/isAdminSlice';

function HomePage() {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:4000/api/posts', {
					withCredentials: true,
				});
				const { isAdmin } = response.data;
				isAdmin && dispatch(makeAdmin());
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	});

	return <div>Home</div>;
}

export default HomePage;
