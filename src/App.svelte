<script>
	import * as d3 from 'd3'
	import { onMount } from 'svelte'
	import { View, InfoBox, OmniBox, ResultsBox, selected_id, selection } from 'anymapper'
	import { treeify, pack } from './layout.js'
	import BubblePack from './BubblePack.svelte'
	import Info from './Info.svelte'

	let nodes = []
	let bubble_color
	let node_index = new Map()

	onMount(async function() {
		let data = await (await fetch('data/wnen30_core_n_longest.json')).json()
		let tree = treeify(data)
		pack(tree, 1000, 1000)

		bubble_color = d3.scaleSequential([tree.height,0], d3.interpolateBlues)

		nodes = tree.descendants()

		// index nodes according to their path
		nodes.forEach(d => node_index.set(d.data.path, d))

		// add a "position" property to each node, to inform anymapper of their location
		nodes.forEach(d => d.position = {x: d.y, y: d.x})
	})

	function updateSelection(_) {
		if(node_index.has($selected_id))
			$selection = node_index.get($selected_id)
		else
			$selection = null
	}
	selected_id.subscribe(updateSelection)
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
	<BubblePack data={nodes} {bubble_color}/>
</View>

<OmniBox>
	<ResultsBox>
		Hi
	</ResultsBox>
</OmniBox>

<InfoBox>
	<Info d={$selection}/>
</InfoBox>

<footer>Powered by <a href="https://github.com/webvis/anymapper">anymapper</a>, by <a href="//hct.iit.cnr.it/">Human Centered Technologies Lab</a> @<a href="//www.iit.cnr.it/">IIT-CNR</a></footer>

</div>
