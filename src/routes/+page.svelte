<!-- 
    This is the main page. It's pretty barebones; we're loading a single component, <Map/>.
    Navigate to src/lib/components/Map.svelte.
 -->

<script lang="ts">
    import { onMount } from 'svelte';
	import Map from '$lib/components/Map.svelte';

    onMount(() => {
        // Update the 'map-(width/height)' CSS variables
        // We're typecasting 'r' as an HTMLElement and adding the non-null assertion, as :root will always exist on a document.
        const r: HTMLElement = document.querySelector(":root")!;
        r.style.setProperty('--map-width', `${window.innerWidth}px`);
        r.style.setProperty('--map-height', `${window.innerWidth * 0.5}px`);
    })
</script>

<h1>MARTA Real-Time Transit Information</h1>
<Map />
