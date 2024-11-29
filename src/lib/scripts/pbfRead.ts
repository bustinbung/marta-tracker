// Protobuffers are a binary data format ("think XML, but smaller, faster, and simpler"), so we need a way to decode the data properly. Normally, you build a schema at runtime using a .proto file (static/gtfs/gtfs-realtime.proto), but the pbf package allows us to build a .js file that will handle all the data serialization and parsing (this is gtfs-proto-schema.js) without having to regenerate the schema everytime the API is called.

import Pbf from 'pbf';
import { json } from '@sveltejs/kit';

export async function pbfRead(pbURL: string, readFunction: Function) {
	// Need to access obj in the global scobe
	let obj;

	try {
		const response = await fetch(pbURL);

		if (response.ok != true) {
			throw new Error(`Fetch error! Status: ${response.status}`);
		}

		// Because protobuffers are binary streams, convert response body to arrayBuffer to pass to pbf.
		const buffer = await response.arrayBuffer();
		const pbf = new Pbf(buffer);

		// Runs the exported schema function on the buffer...
		obj = readFunction(pbf);
	} catch (error) {
		console.error(error);
	}

	// and return the JSON object.
	return json(obj);
}
