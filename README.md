# marta-tracker

A web app that shows the real-time location of MARTA buses.

## Where to Start

### Never touched Svelte(kit)?

Start here, then move to src/routes/+page.svelte. I'll do my best to lead you from there.

### I have some experience.

You're on your own.

## Run Locally
Normal npm project procedure:
```sh
git clone https://github.com/bustinbung/marta-tracker.git # https
git clone git@github.com:bustinbung/marta-tracker.git # ssh

npm install

npm run dev
# or
npm run build
npm run preview
```

## Technologies

- [Svelte(Kit)](https://svelte.dev). UI and JS framework.
- [OpenLayers](https://openlayers.org/). Map library.
- [Papa Parse](https://www.papaparse.com/). Client-side CSV parsing library.
- [pbf](https://github.com/mapbox/pbf). Lightweight protobuffer library.
- [date-fns](https://date-fns.org/). Easy date manipulation.

## Documentation

The code for this project is documented to the best of my ability. The internet is your friend for anything you don't understand. If a file isn't littered with comments, it was either: a) auto-generated or b) not worth documenting.

## Warning

This project will not be maintained after December 8th, 2024. Any large-scale issues or bugs that arise will not be fixed.

## Resources
- [MARTA Developer Resources](https://www.itsmarta.com/app-developer-resources.aspx)
- [GTFS Standard](https://developers.google.com/transit/site-map)
- [Gavin Rehkemper's Protobuffers in Browser blog post](https://gavinr.com/protocol-buffers-protobuf-browser/)
- [eeencode (SVG to base64)](https://www.fffuel.co/eeencode/)