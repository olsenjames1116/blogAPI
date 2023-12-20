import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { makeAdmin } from '../../redux/state/isAdminSlice';

function EditPostPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const redirectUser = () => {
		dispatch(logIn());
		navigate('/');
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:4000/api/posts', {
					withCredentials: true,
				});
				const { isAdmin } = response.data;
				if (!isAdmin) {
					redirectUser();
				} else {
					dispatch(makeAdmin());
					dispatch(logIn());
				}
			} catch (err) {
				console.log(err);
				navigate('/');
			}
		};

		fetchData();
	});

	return <div>EditPostPage</div>;
}

export default EditPostPage;
