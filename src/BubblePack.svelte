<script>
	import { current_transform, viewport } from 'anymapper'
import View from 'anymapper/src/View.svelte';
	import Bubble from './Bubble.svelte'
	import BubbleLabel from './BubbleLabel.svelte'

	export let data
	export let bubble_color

	$: z = $current_transform.k

	function should_bubble_be_visibile(d, zoom) {
		const is_synset = d.data.original_node.type == 'synset'
		const is_in_zoom_range = zoom >= 3/d.r
		return is_synset && is_in_zoom_range
	}

	function should_bubble_label_be_visible(d, zoom) {
		const is_synset = d.data.original_node.type == 'synset'
		const is_in_zoom_range = d.r > 30/zoom && d.r < 120/zoom
		const is_in_viewport = d.x > $viewport.left && d.x < $viewport.right && d.y > $viewport.top && d.y < $viewport.bottom
		const is_parent_not_in_zoom_range = d.parent && (d.parent.r <= 30/zoom || d.parent.r >= 120/zoom)
		return is_synset && is_in_zoom_range && is_in_viewport && is_parent_not_in_zoom_range
	}
</script>

<style>
</style>

<g>
	{#each data as d}
		{#if should_bubble_be_visibile(d, z)}
			<Bubble {d} {bubble_color}/>
		{/if}
	{/each}
	{#each data as d}
		{#if should_bubble_label_be_visible(d, z)}
			<BubbleLabel {d}/>
		{/if}
	{/each}
</g>