<script lang="ts">
	import '$lib/styles/main.css';

	let { children } = $props();
</script>

<svelte:head></svelte:head>

{@render children()}
