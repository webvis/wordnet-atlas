<script>
    import { onMount } from 'svelte'
	export let d

    let label

    $: sense_children = d.data.children.filter(x => x.original_node.type == 'sense')

    onMount(async function() {
		let bbox = label.getBBox()
		let aspect = 1
		if(bbox.width > 0) {
			aspect = bbox.height/bbox.width
		}
		label.setAttribute('transform', `translate(${d.y},${d.x}) scale(${aspect*d.r/10/sense_children.length})`)
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

<text bind:this={label} y="{-sense_children.length/2.0-0.2}em">
    {#each sense_children as sense_child, i}
        <tspan x="0" dy="1em">{ sense_child.original_node.lemma }{i < sense_children.length-1 ? ',' : ''}</tspan>
    {/each}
</text>