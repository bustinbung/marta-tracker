// This is how we fetch data from the GTFS static data that MARTA provides. These come in CSV formatted .txt files that we read and send to Papa Parse to be converted into JSON objects.

import Papa from 'papaparse';
// This function simplifies the process of returning a Response object with JSON content.
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// When a GET request is made to this endpoint, this function runs.
export const GET: RequestHandler = async ({ fetch }) => {
	// It fetches the corresponding .txt file from the static directory...
	const response = await fetch('/marta-gtfs-static/routes.txt');
	// ...parses the response body to text...
	const content = await response.text();

	// ...and passes it to Papa Parse, letting it know that the CSV has a header row and we want it to infer types from the data.
	const stops = Papa.parse(content, { header: true, dynamicTyping: true });
	// Finally, we return the parsed data as a Response object.
	return json(stops);
};

export const prerender = true;
