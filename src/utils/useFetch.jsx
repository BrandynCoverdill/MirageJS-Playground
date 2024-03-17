import { useEffect, useState } from 'react';

export default function useFetch() {
	const [data, setData] = useState(null);

	useEffect(async () => {
		try {
			const d = await fetch('/api/notes');
			const response = await d.json();
			setData(response);
		} catch (e) {
			console.error('Error: ' + e);
		}
	});
	return data;
}
