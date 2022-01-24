<script>
	import * as d3 from 'd3'
	import { onMount } from 'svelte'
	import { Content } from '@smui/card'
	import { View, Layer, InfoBox, OmniBox, FloorLayersCtrl, ResultsBox, InfoBoxHeader, selected_id, selection } from 'anymapper'
	import { treeify, pack } from './layout.js'
	import BubblePack from './BubblePack.svelte'

	let bubbles = []
	let bubble_color
	let bubble_index = new Map()

	onMount(async function() {
		let data = await (await fetch('data/wnen30_core_n_longest.json')).json()
		let tree = treeify(data)
		pack(tree, 1000, 1000)

		bubble_color = d3.scaleSequential([tree.height,0], d3.interpolateBlues)

		bubbles = tree.descendants()

		// index bubbles according to their path
		bubbles.forEach(d => bubble_index.set(d.data.path, d))
	})

	function updateSelection(_) {
		if(bubble_index.has($selected_id))
			$selection = bubble_index.get($selected_id)
		else
			$selection = null
	}
	selected_id.subscribe(updateSelection)

	function get_synset_title(d) {
		return d.children.filter(x => x.data.original_node.type == 'sense').map(x => x.data.original_node.lemma).join(', ')
	}

</script>

<style>
	/* FIXME? global deafults? */
	:global(html), :global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
	.wrapper {
		height: 100%;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		position: absolute;
	}

	:global(a), :global(a:hover), :global(a:visited) {
		text-decoration: none;
		color: var(--primary-bg-color);
	}
	:global(a:hover) {
		text-decoration: underline;
	}

	/* application-specific */
	
	/* define global CSS */
	:global(.infobox) {
		width: 350px;
	}
	:global(.omnibox) {
		width: 350px;
	}
	:global(.view) {
		background: white;
	}

	:global(.selectable) {
		cursor: pointer;
	}
	
	footer {
		position: fixed;
		right: 0;
		bottom: 0;
		font-size: 10px;
		background: rgba(255,255,255,0.6);
		padding: 2px;
	}

	:global(:root) {
		--infobox-header-height: 86px;
		--omnibox-margin: 10px;
	}
</style>

<div class="wrapper">

<View viewBox="0 0 1000 1000">
	<BubblePack data={bubbles} {bubble_color}/>
</View>

<OmniBox>
	<ResultsBox>
		Hi
	</ResultsBox>
</OmniBox>

<InfoBox>
	{#if $selection.data.original_node.type == 'synset'}
		<InfoBoxHeader title="{get_synset_title($selection)}" subtitle="Synset {$selection.data.original_node.id}"/>
		<Content>{$selection.data.original_node.defintion}</Content>
	{:else if $selection.data.original_node.type == 'sense'}
		<InfoBoxHeader title="{$selection.data.original_node.lemma}" subtitle="Sense {$selection.data.original_node.id}"/>
	{/if}
</InfoBox>

<footer>Powered by <a href="https://github.com/webvis/anymapper">anymapper</a>, by <a href="//hct.iit.cnr.it/">Human Centered Technologies Lab</a> @<a href="//www.iit.cnr.it/">IIT-CNR</a></footer>

</div>
