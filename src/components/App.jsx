import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Notes = lazy(() => import('../pages/Notes'));
const NoteDetails = lazy(() => import('../pages/NoteDetails'));

function App() {
	return (
		<Router>
			<Suspense>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/notes' element={<Notes />} />
					<Route path='/notes/:id' element={<NoteDetails />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</Router>
	);
}

export default App;
