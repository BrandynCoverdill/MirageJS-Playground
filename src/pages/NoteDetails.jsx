import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function NoteDetails() {
	const { id } = useParams();
	const [note, setNote] = useState(null);

	useEffect(() => {
		async function fetchNote(id) {
			try {
				const response = await fetch(`/api/notes/${id}`);
				const json = await response.json();
				setNote(json.notes);
			} catch (e) {
				console.error('Error fetching note: ' + e);
			}
		}
		fetchNote(id);
	}, []);

	return (
		<section className='note-details'>
			<h1>Note Details - {id}</h1>
			{note === null ? (
				<p>Loading note...</p>
			) : (
				<section className='note'>
					<h2>{note.title}</h2>
					<p>{note.body}</p>
				</section>
			)}
			<Link to='/notes'>Back to Notes</Link>
		</section>
	);
}
