import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import '../styles/Notes.css';

export default function Notes() {
	const data = useFetch();
	const [showNewNote, setShowNewNote] = useState(false);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	function handleShowNewNote() {
		setShowNewNote(!showNewNote);
	}

	function addNewNoteForm() {
		return (
			<section className='add-new-note-form'>
				<form>
					<div>
						<label htmlFor='title'>Title:</label>
						<input
							type='text'
							name='title'
							id='title'
							onChange={(e) => setTitle(e.target.value)}
							value={title}
						/>
					</div>
					<div>
						<label htmlFor='body'>Body:</label>
						<textarea
							name='body'
							id='body'
							cols='30'
							rows='10'
							onChange={(e) => setBody(e.target.boy)}
							value={body}
						></textarea>
					</div>
					<div>
						<button type='submit'>Create new note</button>
					</div>
				</form>
			</section>
		);
	}

	return (
		<section className='notes'>
			<button type='button' onClick={handleShowNewNote}>
				{showNewNote ? 'Cancel' : 'Add new note'}
			</button>
			{showNewNote ? addNewNoteForm() : ''}
			<h2>Notes</h2>
			{data === null ? (
				<p>Loading notes...</p>
			) : (
				data.map((note) => (
					<section className='note-links' key={note.id}>
						<Link to={note.id}>{note.title}</Link>
					</section>
				))
			)}
			<div className='back'>
				<Link to='/' className='back'>
					Back to Homepage
				</Link>
			</div>
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
