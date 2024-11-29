/*
This is where we parse the realtime data from MARTA. Unlike the nice CSV format in the static dataset, realtime data uses protobuffers.
The actual protobuffer parsing is handled by the pbfRead function in src/lib/scripts/pbfRead.ts, but you should go there after reading the rest of these comments.
*/

// Helper function from pbf package, generated at build time.
import { readFeedMessage } from '$lib/scripts/gtfs-proto-schema';
import { pbfRead } from '$lib/scripts/pbfRead';
import type { RequestHandler } from '@sveltejs/kit';

// When a GET request is made to this endpoint, this function runs.
export const GET: RequestHandler = async () => {
	// Returns a JSON Response from the function.
	return pbfRead(
		'https://gtfs-rt.itsmarta.com/TMGTFSRealTimeWebService/vehicle/vehiclepositions.pb',
		readFeedMessage
	);
};

export const prerender = true;
