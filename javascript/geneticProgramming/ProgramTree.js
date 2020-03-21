class ProgramTree{
  constructor(functionalSet, terminalSet, maxDepth){
    this.functionalSet = functionalSet;
    this.terminalSet = terminalSet;
    this.maxDepth = maxDepth;
    this.root = null;
    this.fitness = 0;
  }

  initialize(functionalSet,terminalSet, maxDepth){
    this.root =  Node.createNode(functionalSet, terminalSet,0, maxDepth)
  }

  crossover(partner){
    //Obtenemos un subarbol del programa B
    let subtree = partner.getRandomSubtree();

    //Lo remplazamos en el arbol de este objeto
    let newNode = new ProgramTree(this.functionalSet, this.terminalSet, this.maxDepth);
    newNode.root = {...this.root};

    newNode.substituteSubtree(subtree);
 
    return newNode;
  }

  getRandomSubtree(){
    let curr = this.root;

    if(curr.left==null&&curr.right==null)
      return curr;
    else{
      let queue = new Queue()
      queue.add(curr);

      while(curr.left!=null&&curr.right!=null){
        queue.add(curr.left)
        queue.add(curr.right)

        curr = queue.remove();

        let s = Math.random();

        if(s<0.5)
          break;
      }

      return curr;
    }
    
  }

  substituteSubtree(subtree){
    let curr = this.root;

    if(curr.left==null&&curr.right==null)
      this.root =  subtree;
    else{
      let queue = new Queue()
      queue.add(curr);
      let last = null;

      while(curr.left!=null&&curr.right!=null){
        last=curr;
        queue.add(curr.left)
        queue.add(curr.right)

        curr = queue.remove();

        let s = Math.random();

        if(s<0.5)
          break;
      }

      let probability = Math.random();

      if(probability<0.5){
        last.left=subtree;
      }else{
        last.right=subtree;
      }
    }
    

  }



  mutate(m){
    let curr = this.root;
    let queue = new Queue()
    queue.add(curr);

    while(curr.left!=null&&curr.right!=null){
      queue.add(curr.left)
      queue.add(curr.right)

      curr = queue.remove();

      let s = Math.random();

      if(s<m){
        if(curr.left==null&&curr.right==null){
          curr.value = Node.getTerminalNode(this.terminalSet).value;
        }else{
          curr.value = Node.getFunctionNode(this.functionalSet).value;
        }
      }
    }
  }

  calcFitness(pointsArray){
    let size = pointsArray.length;
    let f = 1;
    let str = this.program_to_string();
    for (let i = 0; i < size; i++) {
      f+=this.evaluateOnePoint(pointsArray[i],str)/size;
      if(isNaN(f)){
        break
      }
    }
    if(isNaN(f)){
      this.fitness=0;
    }else{
      this.fitness=(1/f);
    }
    
  }

  evaluateOnePoint(point,str){
    
    
    let expression = str.replace(new RegExp("x", 'g'),"("+ point[0].toString()+")");
    let val = eval(expression);


    return Math.abs(val-point[1]);

  }

  program_to_string(){
    return this.to_string(this.root);
  }

  to_string(curr){
    if(curr==null){
      return "vacio";
    }else if(curr.left==null&&curr.right==null){
      var st = "";
      st+=curr.value;

      return st;
    }else{
      var st = "(";

      if(curr.left!=null){
        st += this.to_string(curr.left);
      }

      st +=curr.value;

      if(curr.right!=null){
        st+=this.to_string(curr.right);
      }
      st += ")";
      return st;
    }
  }


}
