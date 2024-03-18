import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Notes.css';

export default function Notes() {
	// TODO: Fetched data is null on mount.
	const fetchedData = useFetch();
	console.log(fetchedData);
	const [data, setData] = useState(fetchedData);
	console.log(data);
	const [showNewNote, setShowNewNote] = useState(false);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	function handleShowNewNote() {
		setShowNewNote(!showNewNote);
	}

	function handleSubmit(e) {
		e.preventDefault();
		// Grab inputs
		const titleInput = document.querySelector('#title');
		const bodyInput = document.querySelector('#body');
		let titleInputError = document.querySelector(
			'.add-new-note-form form div:nth-child(1) p'
		);
		let bodyInputError = document.querySelector(
			'.add-new-note-form form div:nth-child(2) p'
		);

		// Validate inputs
		if (titleInput.value.trim() === '') {
			titleInputError.textContent = 'Please enter a title for the note.';
			titleInput.textContent = '';
			setTitle('');
		} else {
			titleInputError.textContent = '';
		}

		if (bodyInput.value.trim() === '') {
			bodyInputError.textContent = 'Please enter a body for the note.';
			bodyInput.value = '';
			setBody('');
		} else {
			bodyInputError.textContent = '';
		}

		if (bodyInput.value.trim() === '' || titleInput.value.trim() === '') {
			return;
		}

		// Create new note
		try {
			fetch('/api/notes', {
				method: 'POST',
				body: JSON.stringify({
					id: uuidv4().toString(),
					title: titleInput.value,
					body: bodyInput.value,
				}),
			}).then(() => {
				// refresh component with new notes
				fetch('/api/notes')
					.then((response) => response.json())
					.then((json) => setData(json.notes));
			});
		} catch (error) {
			console.error('Error creating new note: ' + error);
		}
		handleShowNewNote();
		setTitle('');
		setBody('');
	}

	function addNewNoteForm() {
		return (
			<section className='add-new-note-form'>
				<form>
					<div>
						<label htmlFor='title'>Title:</label>
						<p className='error'></p>
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
						<p className='error'></p>
						<textarea
							name='body'
							id='body'
							cols='30'
							rows='10'
							onChange={(e) => setBody(e.target.value)}
							value={body}
						></textarea>
					</div>
					<div>
						<button type='submit' onClick={(e) => handleSubmit(e)}>
							Create new note
						</button>
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
