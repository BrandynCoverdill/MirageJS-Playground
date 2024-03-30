import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/NoteDetails.css';

export default function NoteDetails() {
	const { id } = useParams();
	const [note, setNote] = useState(null);
	const [isUpdatingNote, setIsUpdatingNote] = useState(false);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

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

	function handleIsUpdatingNote() {
		setIsUpdatingNote(!isUpdatingNote);
		setTitle(note.title);
		setBody(note.body);
	}

	function handleTitleChange(e) {
		setTitle(e.target.value);
	}

	function handleBodyChange(e) {
		setBody(e.target.value);
	}

	function getNote(id) {
		try {
			const response = fetch(`/api/notes/${id}`)
				.then((res) => res.json())
				.then((json) => setNote(json.notes));
		} catch (err) {
			console.error('Error fetching note: ' + err);
		}
	}

	function handleSubmit(e) {
		e.preventDefault();

		// Grab inputs
		const titleInput = document.querySelector('#title');
		const bodyInput = document.querySelector('#body');
		let titleInputError = document.querySelector(
			'.note-details .note-updating form div:nth-child(1) p'
		);
		let bodyInputError = document.querySelector(
			'.note-details .note-updating form div:nth-child(2) p'
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

		// Update note
		fetch(`/api/notes/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				title: title,
				body: body,
			}),
		})
			.then((res) => {
				getNote(id);
				setIsUpdatingNote(false);
			})
			.catch((err) => {
				console.error('Error updating note: ' + err);
			});
	}

	return (
		<section className='note-details'>
			<h1>Note Details - {id}</h1>
			<button
				type='button'
				className='update-note-btn'
				onClick={handleIsUpdatingNote}
			>
				{isUpdatingNote ? 'Cancel' : 'Update Note'}
			</button>
			{note === null ? (
				<p>Loading note...</p>
			) : isUpdatingNote ? (
				<section className='note-updating'>
					<form>
						<div>
							<label htmlFor='title'>Title:</label>
							<p className='error'></p>
							<input
								type='text'
								id='title'
								name='title'
								value={title}
								onChange={(e) => handleTitleChange(e)}
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
								onChange={(e) => handleBodyChange(e)}
								value={body}
							></textarea>
						</div>
						<div>
							<button type='submit' onClick={(e) => handleSubmit(e)}>
								Update Note
							</button>
						</div>
					</form>
				</section>
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
