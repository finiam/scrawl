import { getUserFromCookies } from '$lib/cookies';
import { createNote, deleteNote, updateNote } from '$lib/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { generateSlug } from 'random-word-slugs';

export const POST = (async ({ cookies, request }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const title = generateSlug(3, {
		format: 'sentence',
		partsOfSpeech: ['adjective', 'adjective', 'noun'],
		categories: {
			adjective: ['color', 'appearance'],
			noun: ['animals']
		}
	});
	const data = await request.json();

	const note = await createNote(user, {
		user: user.username,
		folder: data.folder,
		title
	});

	if (!note.data) {
		throw error(500, 'Failed to create note');
	}

	return json({ id: note.data[0].id, title });
}) satisfies RequestHandler;

export const PUT = (async ({ request, cookies }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const data = await request.json();

	const update = await updateNote(user, data.id, data);

	return json(update);
}) satisfies RequestHandler;

export const DELETE = (async ({ cookies, url }) => {
	const user = getUserFromCookies(cookies);

	if (!user) {
		throw error(401, 'No user');
	}

	const id = url.searchParams.get('id');

	if (!id) {
		throw error(401, 'No id');
	}

	const update = await deleteNote(id);

	return json(update);
}) satisfies RequestHandler;
