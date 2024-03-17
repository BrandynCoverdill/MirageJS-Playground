import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
	/**
	 * The createServer function is responsible for creating a new mock server instance.
	 */
	const server = createServer({
		/**
		 * The environment option allows us to choose between development and test.
		 * If it is set to development, it will load the seeds and log all its responses to the console.
		 */
		environment,

		models: {
			notes: Model,
		},
		/**
		 * Seeds are initial data.
		 */
		seeds(server) {
			server.create('note', {
				id: 1,
				title: 'Note 1 Title',
				body: 'Note 1 Body',
			});
			server.create('note', {
				id: 2,
				title: 'Note 2 Title',
				body: 'Note 2 Body',
			});
			server.create('note', {
				id: 3,
				title: 'Note 3 Title',
				body: 'Note 3 Body',
			});
		},

		/**
		 * Routes will be used access the data and do the following:
		 *
		 * GET - /api/notes -> view all note records
		 * GET - /api/notes/:id -> fetch a single record
		 * POST - /api/notes -> create a new note record
		 * PATCH - /api/notes/:id -> update an existing note record
		 * DELETE - /api/notes/:id -> Delete an existing note record
		 */
		routes() {
			/**
			 * This namespace allows us to define the API namespace so we dont have to repeat it
			 * in all the routes of our application
			 *
			 * Example: /api/notes/:id
			 *
			 * The schema argument is used to access data from the notes model
			 * The request arguemnt is ised to access data from our application
			 */
			this.namespace = 'api/notes';

			// View all note records
			this.get('/', (schema, request) => {
				return schema.notes.all();
			});

			// View specific note record
			this.get('/:id', (schema, request) => {
				const id = request.params.id;
				return schema.notes.find(id);
			});

			// Create a new note record
			this.post('/', (schema, request) => {
				let attrs = JSON.parse(request.requestBody);
				return schema.notes.create(attrs);
			});

			// Update an existing note record
			this.patch('/:id', (schema, request) => {
				const newAttrs = JSON.parse(request.requestBody);
				const id = request.params.id;
				const note = schema.notes.find(id);
				return note.update(newAttrs);
			});

			// Delete an existing note record
			this.delete((schema, request) => {
				const id = request.params.id;
				return schema.notes.find(id).destroy();
			});
		},
	});
	return server;
}
