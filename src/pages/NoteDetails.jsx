import { useParams } from 'react-router-dom';

export default function NoteDetails() {
	const { id } = useParams();
	return (
		<section className='note-details'>
			<h1>Note Details - {id}</h1>
		</section>
	);
}
