import useFetch from '../utils/useFetch';
import '../styles/Notes.css';

export default function Notes() {
	const data = useFetch();
	return (
		<section className='notes'>
			<h2>Notes</h2>
			{data === null ? (
				<p>Loading data...</p>
			) : (
				data.notes.map((note) => <p key={note.id}>{note.title}</p>)
			)}
		</section>
	);
	// TODO
	/**
	 * 1. Display a list of clickable notes.
	 * 2. Have a form to create a new note record.
	 * 3. When you are in a note (/notes/1 for example), display the note record.
	 * 4. Along with the note record above, make it so you can edit it.
	 * 5. Along with the above, make it so you can delete the note.
	 */
}
