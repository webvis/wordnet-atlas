import * as d3 from 'd3'

export function treeify(graph) {
    // index nodes
    graph.nodes_index = new Map()
    graph.nodes.forEach(d => graph.nodes_index.set(d.id, d))
    
    graph.links.forEach(d => {
      // objectify the graph
      d.source = graph.nodes_index.get(d.source)
      d.target = graph.nodes_index.get(d.target)
  
      // create a dag structure
      if(d.source.children === undefined) {
        d.source.children = []
      }
      if(d.target.parents === undefined) {
        d.target.parents = []
      }
  
      d.source.children.push(d.target)
      d.target.parents.push(d.source)
    })
    
    // construct a redundant hierarchy with all the paths from root to leaves
    let root = graph.nodes_index.get(100001740) // this is the synset id for "entity"
    let network = {
      nodes: [],
      equivalence_links: []
    }
    let node_equivalence_chains = new Map()
    const MAX_HEIGHT = Infinity
    
    function walk(n, depth, path, redundant) {
      let current_node = {
        path: path + n.id,
        original_node: n
      }
      network.nodes.push(current_node)
      
      // create equivalence link if needed
      let chain
      if(!(node_equivalence_chains.has(n.id))) {
        chain = []
        node_equivalence_chains.set(n.id, chain)
      }
      else {
        chain = node_equivalence_chains.get(n.id)
      }
      if(chain.length >= 1) {
        if(!redundant) {
          // link to previous node in chain
          network.equivalence_links.push({source: chain[chain.length-1], target: current_node})
        }
        // mark all sub-hierarchy as redundant
        redundant = true
      }
      chain.push(current_node)
      
      if(n.children === undefined) {
        return current_node
      }
      if(depth >= MAX_HEIGHT) {
        return current_node
      }
      
      current_node.children = []
      n.children.forEach(c => {
        let child = walk(c, depth+1, current_node.path+'/', redundant)
        current_node.children.push(child)
      })
      
      return current_node
    }
    
    network.root = walk(root,1,'/',false)
    
    let tree = d3.hierarchy(network.root)
        .sum(d => d.original_node.type == 'sense' ? 1 : 0)
        .sort((a, b) => b.id - a.id)

    return tree
}

export function pack(data, width, height) {
    d3.pack()
        .size([width - 2, height - 2])
        .padding(0.25)
    (data)
}