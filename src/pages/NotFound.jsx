import '../styles/NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<section className='not-found'>
			<h1>Oops, there is nothing here!</h1>
			<Link to='/'>Back to homepage</Link>.
		</section>
	);
}
