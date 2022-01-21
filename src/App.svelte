<script>
	import { View, Layer, InfoBox, OmniBox, FloorLayersCtrl, ResultsBox, InlineSVG } from 'anymapper'
	import CirclesExample from './CirclesExample.svelte'

	let data = [{
		x: 100,
		y: 100,
		v: 200,
		color: 'orange'
	},{
		x: 400,
		y: 200,
		v: 250,
		color: 'teal'
	}]
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
		background: #e3f4d7;
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

<View viewBox="0 0 800 800">
	<CirclesExample {data}/>
</View>

<FloorLayersCtrl/>

<OmniBox>
	<ResultsBox>
		Hi
	</ResultsBox>
</OmniBox>

<InfoBox>
	Hello
</InfoBox>

<footer>Powered by <a href="https://github.com/webvis/anymapper">anymapper</a>, by <a href="//hct.iit.cnr.it/">Human Centered Technologies Lab</a> @<a href="//www.iit.cnr.it/">IIT-CNR</a></footer>

</div>
