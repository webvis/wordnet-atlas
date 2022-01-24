<script>
	import { selection } from 'anymapper'
    
	export let d
    export let bubble_color
</script>

<style>
	.selected {
		stroke: black;
		stroke-width: 2px;
		vector-effect: non-scaling-stroke;
	}
</style>

<g>
    <circle
        cx="{d.y}"
        cy="{d.x}"
        r="{d.r}"
        fill={bubble_color(d.height)}
        on:click="{() => $selection = d}" class:selected="{$selection == d}"
    />
</g>