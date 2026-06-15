<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	onMount(() => goto(`${base}/scale/major`, { replaceState: true }));
</script>

<p>Loading…</p>
