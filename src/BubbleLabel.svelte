<script>
    import { onMount } from 'svelte'
	import { selection, select } from 'anymapper'
	export let d

    let label

    $: sense_children = d.children.filter(x => x.data.original_node.type == 'sense')

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
    }
    .sense:hover, .selected {
        fill: black;
        cursor: pointer;
        stroke: white;
        stroke-width: 5px;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
        paint-order: stroke;
    }
    .comma {
        pointer-events: none;
    }
</style>

<text bind:this={label} y="{-sense_children.length/2.0-0.2}em">
    {#each sense_children as sense_child, i}
        <tspan
            x="0"
            dy="1em"
            class="sense"
            on:click="{() => select(sense_child.data.path) }"
            class:selected="{$selection == sense_child}"
        >{ sense_child.data.original_node.lemma }
        </tspan>
        <tspan class="comma">{i < sense_children.length-1 ? ',' : ''}</tspan>
    {/each}
</text>