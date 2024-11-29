// If you're here and haven't read the comments in ../routes/+server.ts, go do that :)

import Papa from 'papaparse';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/marta-gtfs-static/stops.txt');
	const content = await response.text();

	const stops = Papa.parse(content, { header: true, dynamicTyping: true });
	return json(stops);
};
