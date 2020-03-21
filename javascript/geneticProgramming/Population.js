class Population{
    constructor(num, functionalSet, terminalSet, maxDepth, mutation_rate, elitismQ, reproduction){
      this.population = [];
      this.best = "";
      this.mutationRate = mutation_rate;
      this.finished = false;
      this.generations = 0;
      this.perfectScore = 1;
      this.matingPool = [];
      this.maxFitness = 1;
      this.elitismQ = elitismQ;
      this.reproduction = reproduction;
      this.sumFitness=1;

      this.functionalSet=functionalSet;
      this.terminalSet=terminalSet;
      this.maxDepth=maxDepth;
      
      for (var i = 0; i < num; i++) {
        this.population[i] = new ProgramTree(this.functionalSet, this.terminalSet, this.maxDepth);
        this.population[i].initialize(this.functionalSet, this.terminalSet, this.maxDepth);
        //console.log(this.population[i].program_to_string());
      }
    }
  
    calcFitness(arrayPoints){
      for (var i = 0; i < this.population.length; i++) {
        this.population[i].calcFitness(arrayPoints);
        if(this.population[i].fitness >= this.maxFitness-0.20){
          this.finished = true;
          console.log(this.generations+1)
        }
      }
    
    }
  


    getOneParent(){
      let x = Math.floor(Math.random()*this.population.length);
      let y = Math.floor(Math.random()*this.population.length);
      let g=y;
      if(this.population[x]<y)
        g=x;

      let data = JSON.parse(JSON.stringify(this.population[g]));
      let parent = new ProgramTree();
      parent.terminalSet = this.population[g].terminalSet;
      parent.functionalSet = this.population[g].functionalSet;
      parent.maxDepth = this.population[g].maxDepth;
      parent.root = data.root;
      parent.fitness = data.fitness;

      return parent;
    }
  
    generate(){

      let newPopulation = [];
      this.population.sort((a,b) => (a.fitness < b.fitness) ? 1 : ((b.fitness < a.fitness) ? -1 : 0)); 

      
      for (let i = 0; i < this.elitismQ; i++) {
        newPopulation[i] =this.population[i];

      }
      for (let i = 0; i < this.reproduction; i++) {
        var parentA = this.getOneParent();
        parentA.mutate(this.mutationRate);
        newPopulation[this.elitismQ+i]=parentA;
      }

      for (let i = 0; i < (this.population.length-this.elitismQ-this.reproduction); i++) {
  
        var parentA = this.getOneParent();
        var parentB = this.getOneParent();
  
        var childA = parentA.crossover(parentB);
        childA.mutate(this.mutationRate);
        
        
        newPopulation[this.elitismQ+this.reproduction+i] = childA;
      }
  
      this.generations++;
      this.population=newPopulation;
    }
    
  
  
    getBest(){
      var max = this.population[0].fitness;
      var best = this.population[0];
      for (var i = 0; i < this.population.length; i++) {
        if(this.population[i].fitness > max){
          max = this.population[i].fitness;
          best = this.population[i];
        }
      }
  
      return best;
    }
  
    getAverageFitness(){
      var avg = 0;
  
      for (var i = 0; i < this.population.length; i++) {
        avg += this.population[i].fitness;
      }
  
      return avg/this.population.length;
    }
  }