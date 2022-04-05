<script>
	import { settled_zoom, settled_viewport } from 'anymapper'
	import Bubble from './Bubble.svelte'
	import BubbleLabel from './BubbleLabel.svelte'

	export let data
	export let bubble_color

	function should_bubble_be_visibile(d, z, view) {
		const is_synset = d.data.original_node.type == 'synset'
		const is_in_zoom_range = z >= 3/d.r
		return is_synset && is_in_zoom_range
	}

	function should_bubble_label_be_visible(d, z, view) {
		const is_synset = d.data.original_node.type == 'synset'
		const is_in_zoom_range = d.r > 30/z && d.r < 120/z
		const is_in_viewport = d.y > view.left && d.y < view.right && d.x > view.top && d.x < view.bottom
		const is_parent_not_in_zoom_range = d.parent && (d.parent.r <= 30/z || d.parent.r >= 120/z)
		return is_synset && is_in_zoom_range && is_in_viewport && is_parent_not_in_zoom_range
	}
</script>

<style>
</style>

<g>
	{#each data as d}
		{#if should_bubble_be_visibile(d, $settled_zoom, $settled_viewport)}
			<Bubble {d} {bubble_color}/>
		{/if}
	{/each}
	{#each data as d}
		{#if should_bubble_label_be_visible(d, $settled_zoom, $settled_viewport)}
			<BubbleLabel {d}/>
		{/if}
	{/each}
</g>