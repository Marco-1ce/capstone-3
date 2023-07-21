import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {

	// the ".clear" will delete the token stored in the local storage
	// localStorage.clear();

	const { unsetUser, setUser } = useContext(UserContext);

	// This invokes the unsetUser function from App.js to clear the data/token fom the local storage. This will result to the value undefined.
	unsetUser();

	useEffect(() => {
		// Set the user state back to it's original value.
		setUser({
			id: null,
			isAdmin: null
		})
	})


	return (
		<Navigate to="/login" />
	)

}