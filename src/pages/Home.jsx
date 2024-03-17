import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
	return (
		<section className='home'>
			<h1>Homepage</h1>
			<Link to='/notes'>View all notes</Link>
		</section>
	);
}
