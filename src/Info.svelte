<script>
	import { select } from 'anymapper'
	import { Content } from '@smui/card'

    $: type = d.data.original_node.type
    
	export let d

    function get_synset_children_lemmas(d) {
        return d.data.children.filter(x => x.original_node.type == 'sense').map(x => x.original_node.lemma)
    }
    function get_siblings_lemmas(d) {
		return get_synset_children_lemmas(d.parent).filter(x => x != d.data.original_node.lemma)
	}
    function expand_pos(pos) {
        switch(pos) {
            case 'n':
                return 'noun'
            case 'v':
                return 'verb'
            case 'a':
                return 'adjective'
            case 'r':
                return 'adverb'
        }
    }
</script>

<style>
    span {
        font-family: serif;
    }
    .title {
        font-weight: bold;
    }
    .pos {
        text-transform: uppercase;
        font-size: smaller;
    }
    .sensenum {
        font-weight: bold;
    }
    .synonyms {
        font-style: italic;
    }
    .definition {
        font-style: italic;
    }
</style>

<Content>
    <span class="title">{type == 'synset' ? get_synset_children_lemmas(d).join(', ') : d.data.original_node.lemma}</span>
    <span class="pos">{expand_pos(d.data.original_node.pos)}</span>
    <span class="sensenum">{type == 'synset' ? '-' : d.data.original_node.sensenum+'.'}</span>
    {#if type == 'sense'}
        <span class="synonyms">{ get_siblings_lemmas(d).join(', ') }:</span>
    {/if}
    <span class="definition">{type == 'synset' ? d.data.original_node.definition : d.parent.data.original_node.definition}.</span>
</Content>