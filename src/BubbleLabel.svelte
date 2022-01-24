<script>
    import { onMount } from 'svelte'
	export let d

    let label

    onMount(async function() {
		let bbox = label.getBBox()
		let aspect = 1
		if(bbox.width > 0) {
			aspect = bbox.height/bbox.width
		}
		label.setAttribute('transform', `translate(${d.y},${d.x}) scale(${aspect*d.r/10})`)
	})
</script>

<style>
    text {
        text-anchor: middle;
        text-transform: uppercase;
        fill: white;
        font-weight: bold;
        pointer-events: none;
    }
</style>

<text bind:this={label} dy=".35em">
    { d.data.children.filter(x => x.original_node.type == 'sense')[0].original_node.lemma }
</text>