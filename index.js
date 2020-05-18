function findAdjacent(rootNode, vertices, edges) {
    let adjacentNodeNames = []
    let adjacentNodes = []
    
    for(let i = 0; i < edges.length; i++) {
        let edge = edges[i]
        if(edge.indexOf(rootNode) !== -1) {
            (edge.indexOf(rootNode) === 0) ? adjacentNodeNames.push(edge[1]) : adjacentNodeNames.push(edge[0])
        }
    }

    for(let j = 0; j < adjacentNodeNames.length; j++) {
        let adjacentNodeName = adjacentNodeNames[j]
        for(let k = 0; k < vertices.length; k++) {
            let vertex = vertices[k]
            if(vertex.name === adjacentNodeName && vertex.distance === null) {
                adjacentNodes.push(vertex)
            }
        }
    }

    return adjacentNodes
}

function markDistanceAndPredecessor(predecessor, adjacentNodes) {
    
    for(let i = 0; i < adjacentNodes.length; i++) {
        adjacentNodes[i].predecessor = predecessor
        adjacentNodes[i].distance = predecessor.distance + 1
    }
}

function bfs(rootNode, vertices, edges){
    let vertexList = [rootNode]
    let queue = []
    rootNode.distance = 0
    let adjacentNodes = findAdjacent(rootNode.name, vertices, edges)
    markDistanceAndPredecessor(rootNode, adjacentNodes)
    for(let i = 0; i < adjacentNodes.length; i++) {
        queue.push(adjacentNodes[i])
    }
    
    while(queue.length !== 0) {
        let currentNode = queue.shift()
        adjacentNodes = findAdjacent(currentNode.name, vertices, edges)
        markDistanceAndPredecessor(currentNode, adjacentNodes)
        for(let j = 0; j < adjacentNodes.length; j++) {
            queue.push(adjacentNodes[j])
        }
        
        vertexList.push(currentNode) 
    }

    console.log(vertexList)

    return vertexList
}
