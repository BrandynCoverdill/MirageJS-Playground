import { useEffect, useState } from 'react';

export default function useFetch() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/notes');
				const json = await response.json();
				setData(json);
			} catch (e) {
				console.error('Error fetching data: ' + e);
			}
		};
		fetchData();
	}, []);
	return data;
}
