<!-- 
    This is where the bulk of the work for this project occurs. Using OpenLayers, it:
    - Creates a map inside the <div> at the bottom of the page.
    - Loads tiles from OpenStreetMap
    - Fetches all the data we need
    - Displays and renders the data
    - Refreshes the map as new data is fetched.
 -->

<script lang="ts">
    /* Modified from https://github.com/kgolding/svelte-openlayers-example/ */

    // Imports all of the necessary functions and classes from OpenLayers (OL). They'll be explained as they come up.
    import Map from 'ol/Map';
    import View from 'ol/View';
    import TileLayer from 'ol/layer/Tile';
    import VectorLayer from 'ol/layer/Vector';
    import OSM from 'ol/source/OSM';
    import VectorSource from 'ol/source/Vector';
    import { fromLonLat } from 'ol/proj';
    import { Collection, Feature } from 'ol';
    import { Point } from 'ol/geom';
    import { Circle, Fill, Icon, Stroke, Style } from 'ol/style';
    import 'ol/ol.css';

    // Imports the date formatting functions from date-fns.
	import { format, fromUnixTime } from 'date-fns';

    // Imports the Svelte functions and types we need.
    import { onMount } from 'svelte';
    import type { Action } from 'svelte/action';

    // Finally, import the fetch functions for the data from the scripts folder (more on them later).
    import { fetchStops, fetchVehicles, fetchRoutes } from '$lib/scripts/fetchData';

    // These are defaults for the map.
    // OL likes coordinates in longitude/latitude format
    const center = [-84.3595, 33.8220];
    const zoom = 10.6;

    // These control the state of the map.
    // Set map to null. We need to be able to access map from the global scope, so we need to initialize here. However, we don't want to create a new Map class just to reassign everything, so set it to null.
    let map: Map | null = null;
    let mapDivId = 'map';
    // Unused, but if needed, would halt updating the map.
    let stop = false;
    // $state() is a Svelte function that tells it that the variable will update. With it, Svelte creates an effect and will dynamically update the DOM as this variable changes.
    let timestamp = $state(Date.now());
    // In ms.
    let refreshInterval = 30000;
    // Similar to map. Because we're accessing this variable from within two different functions, we need it in the global scope.
	let routes: { data: any[] };

    // Create the base layer for the map.
    const osmLayer = new TileLayer({
        // Load data from OpenStreetMap.
        source: new OSM()
    });

    // Create the view (camera)
    const view = new View({
        // Convert from longitude/latitude to XY
        center: fromLonLat(center),
        zoom,
        minZoom: zoom
    });

    // Collections are a OL helper that acts similarly to $state(). As new items are pushed to the Collection, the layer it's on will update. This particular collection will hold all the stops.
    const stopFeatureCollection = new Collection<Feature>([]);

    // VectorLayers aren't incredibly performant with large amounts of data, but because we expect the user to zoom in and out, we need the full vector layer instead of a VectorImageLayer
    const stopsLayer = new VectorLayer({
        source: new VectorSource({
            // Connecting it to the collection
            features: stopFeatureCollection
        })
    });

    // Here, we're initializing an array with two collections to hold the bus data. If you know about double buffering, it's essentially that.
    const busFeatureCollections = [new Collection<Feature>([]), new Collection<Feature>([])];

    // Just like the collections, we need two layers to link to each collection.
    const busLayers = [
        new VectorLayer({
            source: new VectorSource({
                features: busFeatureCollections[0]
            })
        }),
        new VectorLayer({
            source: new VectorSource({
                features: busFeatureCollections[1]
            })
        })
	];

    // Okay, here's the main bulk of the logic. This function will update the map with the current vehicle locations.
    async function updateVehicleLocation(stopExecution: boolean = false, currentCollection: number = 0) {
        // This holds the current vehicle data.
        const vehicles = await fetchVehicles();

        // Loop over every vehicle in the array...
        for (const vehicle of vehicles.entity) {
            // Create an OL feature. This is the thing that will represent the bus.
            const feature = new Feature({
                geometry: new Point(fromLonLat([vehicle.vehicle.position.longitude, vehicle.vehicle.position.latitude])),
                // This is ugly, I know. Take it up with the GTFS standard.
				name: vehicle.vehicle.vehicle.id
            });

            // Find the route that matches the current vehicle's route and save it.
            const route = routes.data.find((element) => {
				return vehicle.vehicle.trip.route_id == element.route_id;
            });

            // Style declaration for the bus feature. Two icons, the bus icon itself and the shape that contains it.
            const busStyle = [
                new Style({
                    image: new Icon({
                        scale: 1,
                        // Moving the icon slightly to better align
                        anchor: [0.5, 0.4],
                        // Set background to the color of the route
                        color: `#${route.route_color}`,
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        // base64 encoded SVG for icon
						src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAzNC4xNSIgd2lkdGg9IjI2IiBoZWlnaHQ9IjM0LjE1Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICAgIHN0cm9rZTogIzAwMDsKICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdDogMTA7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMywuNUM2LjEuNS41LDYuMS41LDEzYzAsMTAuMjgsMTIuNSwyMC41MSwxMi41LDIwLjUxLDAsMCwxMi41LTEwLjIyLDEyLjUtMjAuNTFDMjUuNSw2LjEsMTkuOS41LDEzLC41WiIvPgogIDwvZz4KPC9zdmc+',
                        // Rotation is expected to be in rads, but data returns deg, so do conversion
						rotation: vehicle.vehicle.position.bearing * (Math.PI / 180)
                    })
                }),
                new Style({
                    image: new Icon({
                        scale: 0.3,
						src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIiB3aWR0aD0iNTcuNiIgaGVpZ2h0PSI1MS4yIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNy4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZD0iTTI4OCAwQzQyMi40IDAgNTEyIDM1LjIgNTEyIDgwbDAgMTYgMCAzMmMxNy43IDAgMzIgMTQuMyAzMiAzMmwwIDY0YzAgMTcuNy0xNC4zIDMyLTMyIDMybDAgMTYwYzAgMTcuNy0xNC4zIDMyLTMyIDMybDAgMzJjMCAxNy43LTE0LjMgMzItMzIgMzJsLTMyIDBjLTE3LjcgMC0zMi0xNC4zLTMyLTMybDAtMzItMTkyIDAgMCAzMmMwIDE3LjctMTQuMyAzMi0zMiAzMmwtMzIgMGMtMTcuNyAwLTMyLTE0LjMtMzItMzJsMC0zMmMtMTcuNyAwLTMyLTE0LjMtMzItMzJsMC0xNjBjLTE3LjcgMC0zMi0xNC4zLTMyLTMybDAtNjRjMC0xNy43IDE0LjMtMzIgMzItMzJjMCAwIDAgMCAwIDBsMC0zMnMwIDAgMCAwbDAtMTZDNjQgMzUuMiAxNTMuNiAwIDI4OCAwek0xMjggMTYwbDAgOTZjMCAxNy43IDE0LjMgMzIgMzIgMzJsMTEyIDAgMC0xNjAtMTEyIDBjLTE3LjcgMC0zMiAxNC4zLTMyIDMyek0zMDQgMjg4bDExMiAwYzE3LjcgMCAzMi0xNC4zIDMyLTMybDAtOTZjMC0xNy43LTE0LjMtMzItMzItMzJsLTExMiAwIDAgMTYwek0xNDQgNDAwYTMyIDMyIDAgMSAwIDAtNjQgMzIgMzIgMCAxIDAgMCA2NHptMjg4IDBhMzIgMzIgMCAxIDAgMC02NCAzMiAzMiAwIDEgMCAwIDY0ek0zODQgODBjMC04LjgtNy4yLTE2LTE2LTE2TDIwOCA2NGMtOC44IDAtMTYgNy4yLTE2IDE2czcuMiAxNiAxNiAxNmwxNjAgMGM4LjggMCAxNi03LjIgMTYtMTZ6Ii8+PC9zdmc+'
					})
                    })
			];

            feature.setStyle(busStyle);

            /*
            Okay, here's why we needed two collections. When I implemented this with just one collection, the time between the collection being cleared and the new data being processed was long enough that there was a flash as the content updated.
            Here, we're using a double buffer, where we write all the data to a layer first, befor clearing the old layer. This ensures that there isn't a noticable flash as new data comes in.
            */
            if (currentCollection == 0) {
                busFeatureCollections[1].push(feature);
            } else {
                busFeatureCollections[0].push(feature);
            }
        }

        if (currentCollection == 0) {
            busFeatureCollections[0].clear();
            currentCollection = 1;
        } else {
            busFeatureCollections[1].clear();
            currentCollection = 0;
        }

        timestamp = vehicles.header.timestamp;

        // This is how we're looping the function, as opposed to setInterval, because we want the function to run first before entering the delayed loop.
        if (!stopExecution) {
            setTimeout(() => {updateVehicleLocation(stop, currentCollection)}, refreshInterval);
        }
    }

    // This is a Svelte directive. It will run only when the component has fully mounted to the DOM. Similar to jQuery's 'ready' or window.onload
    onMount(async () => {
        // These are style declarations.
        const stopFill = new Fill({
            color: 'rgba(255,255,255,0.4)'
		});

        const stopStoke = new Stroke({
            color: '#3399CC',
            width: 1.25
		});

        const stopStyle = new Style({
            image: new Circle({
                fill: stopFill,
                stroke: stopStoke,
				radius: 5
            }),
            fill: stopFill,
			stroke: stopStoke
		});

        // Fetch our static data
        routes = await fetchRoutes();
        const stops = await fetchStops();

        for (const stop of stops.data) {
            if (!stop.stop_id) {
                return;
            }

            const feature = new Feature({
                geometry: new Point(fromLonLat([stop.stop_lon, stop.stop_lat])),
                name: stop.stop_name,
                style: stopStyle
            });

            stopFeatureCollection.push(feature);
        }
    });

    // This is a Svelte Action. This particular action is called when the component is first created and sets up all the OL stuff. 
    const setup: Action<HTMLDivElement, string, {}> = (node, _id: string) => {
        map = new Map({
            target: _id,
            layers: [osmLayer, stopsLayer, ...busLayers],
            view: view
        });

        // This $effect() will run after the component has been rendered to the DOM.
        $effect(() => {
            updateVehicleLocation(false, 1);

            // And this will run when the component is destroyed.
            return () => {
                if (map) {
                    map = null;
                }

                stop = true;
            };
        });
    };
</script>

<!-- The {} syntax is similar to Vue. You can put any JS expression into it. -->
<p>Timestamp: {format(fromUnixTime(timestamp), 'MM/dd/yyyy HH:mm:ss')}</p>
<div id={mapDivId} use:setup={mapDivId}></div>

<!-- 
    One neat thing about Svelte components is that <style> blocks are scoped to the component. This isn't
    particularly noteworthy for this project, but it's a convention you get used to quickly as long as you
    have solid root CSS.
 -->
<style>
    #map {
        width: 1000px;
        height: 600px;
    }
</style>

<!--
    You made it to the end! Congrats!
    To explore the fetch functions, navigate to src/lib/scripts/fetchData.ts.
-->