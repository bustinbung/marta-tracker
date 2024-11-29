/*
These functions simplify the process of fetching data from the rudimentary "API". They have the same format, but call different routes.
To explore a specific API route, navigate to src/routes/api/ and find the +server.ts function in the route you're interested in.
*/

export async function fetchVehicles() {
	try {
		const response = await fetch('/api/vehicles');
		const vehicles = await response.json();

		return vehicles;
	} catch (error) {
		console.error(error);
	}
}

export async function fetchStops() {
	try {
		const response = await fetch('/api/stops');
		const stops = await response.json();

		return stops;
	} catch (error) {
		console.error(error);
	}
}

export async function fetchRoutes() {
	try {
		const response = await fetch('/api/routes');
		const stops = await response.json();

		return stops;
	} catch (error) {
		console.error(error);
	}
}
