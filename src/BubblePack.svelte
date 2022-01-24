<script>
	import { current_transform } from 'anymapper'
	import Bubble from './Bubble.svelte'
	import BubbleLabel from './BubbleLabel.svelte'

	export let data
	export let bubble_color

	$:z = $current_transform.k
</script>

<style>
</style>

<g>
	{#each data as d}
		{#if d.data.original_node.type == 'synset' && z >= 3/d.r}
			<Bubble {d} {bubble_color}/>
		{/if}
	{/each}
	{#each data as d}
		{#if d.data.original_node.type == 'synset' && d.r > 30/z && d.r < 120/z && d.parent && (d.parent.r <= 30/z || d.parent.r >= 120/z) }
			<BubbleLabel {d}/>
		{/if}
	{/each}
</g>