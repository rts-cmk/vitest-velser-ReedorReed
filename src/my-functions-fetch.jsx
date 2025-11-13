import React, { useEffect, useState } from 'react';

export default function FetchUser({ userId }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
			.then((response) => response.json())
			.then((data) => setUser(data));
	}, [userId]);
	console.log(user);

	if (!user) return <p>Loading...</p>;

	return (
		<div>
			<h2>{user.name}</h2>
			<p>{user.email}</p>
		</div>
	);
}
