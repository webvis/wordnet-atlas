<script>
	import { Content } from '@smui/card'

    export let d

    $: type = d.data.original_node.type
    $: synonyms = get_sense_siblings(d)
	$: hypernyms = get_parent_senses(d)

    function get_synset_children(d) {
        return d.data.children.filter(x => x.original_node.type == 'sense')
    }
    function get_synset_children_lemmas(d) {
        return get_synset_children(d).map(x => x.original_node.lemma)
    }
    function get_sense_siblings(d) {
		return get_synset_children(d.parent).filter(x => x.original_node.type == 'sense' && x.original_node.id != d.data.original_node.id)
	}
    function get_parent_senses(d) {
        return d.parent.parent ? d.parent.parent.data.children.filter(x => x.original_node.type == 'sense') : []
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
    .synonyms, .hypernyms {
        font-style: italic;
    }
    .synonyms > :not(:last-child)::after, .hypernyms > :not(:last-child)::after {
        content: ', '
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
        <span class="synonyms">
            {#each synonyms as synonym}<span><a href="#{ synonym.path }">{ synonym.original_node.lemma }</a></span>{/each}{#if synonyms.length > 0}:{/if}</span>
    {/if}
    <span class="definition">{type == 'synset' ? d.data.original_node.definition : d.parent.data.original_node.definition}.</span>
    {#if type == 'sense'}
        {#if hypernyms.length > 0}
            <br><span>More generic: </span><span class="hypernyms">
                {#each hypernyms as hypernym}<span><a href="#{ hypernym.path }">{ hypernym.original_node.lemma }</a></span>{/each}{#if hypernyms.length > 0}.{/if}</span>
        {/if}
    {/if}
</Content>