
class Node{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }

  static createNode(functionalSet,terminalSet,depth, maxDepth){
    if(depth>=maxDepth){
      return this.getTerminalNode(terminalSet);
    }else{
      let probability = Math.random();
      if(probability<0.3){
        return this.getTerminalNode(terminalSet);
      }else{
        let node =  this.getFunctionNode(functionalSet);
        node.left = this.createNode(functionalSet, terminalSet, depth+1, maxDepth);
        node.right = this.createNode(functionalSet, terminalSet, depth+1, maxDepth);

        return node;
      }
    }
  }

  static getTerminalNode(terminalSet){
    let idx = Math.floor(Math.random() * terminalSet.length);
    if(terminalSet[idx]=='R'){
      return new Node("("+(Math.random()*20 - 10).toFixed(1)+")");
    }else{
      return new Node(terminalSet[idx]);
    }
  }

  static getFunctionNode(functionalSet){
    let idx = Math.floor(Math.random() * functionalSet.length);
    return new Node(functionalSet[idx]);
  }
  
}