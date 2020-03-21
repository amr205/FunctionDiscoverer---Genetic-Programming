var arrayPoints = [];
var bestFn = '0';
var population;

var parameters = {
    target: '#myFunction',
    data: [
   {
    points: arrayPoints,
    fnType: 'points',
    graphType: 'scatter'
  },
  { fn: bestFn, color: 'pink' }],

    grid: true,
    yAxis: {domain: [-10, 10]},
    xAxis: {domain: [-10, 10]},
    width:600,
    height:600,
    disableZoom: true,

};


function plot() {

      parameters = {
        target: '#myFunction',
        data: [
      {
        points: arrayPoints,
        fnType: 'points',
        graphType: 'scatter'
      },
      { fn: bestFn, color: 'pink' }],

        grid: true,
        yAxis: {domain: [-10, 10]},
        xAxis: {domain: [-10, 10]},
        width:600,
        height:600,
        disableZoom: true,

    };
    functionPlot(parameters);   
}



$(document).ready(function() {
  plot();

  var svg = d3.select("#myFunction svg");
  //console.log(svg)
  svg.on("click", function () {
      var mouse = d3.mouse(this);
      var x = (mouse[0]-(parameters.width)/2)/((parameters.width/2)-30)*parameters.xAxis.domain[1];
      var y = (mouse[1]-(parameters.height)/2)/((parameters.height/2)-22)*parameters.yAxis.domain[0];
      arrayPoints.push([x,y]);
    
      plot();
  });

  

});


function setup(){
  frameRate(6);
    noLoop();
}

function draw(){
    if(population==null){
      population = new Population(55, ['*','-','+','/'], ['x','R','R'], 3, 0.25, 5,30);
    }else{
        population.calcFitness(arrayPoints);
        let best= population.getBest();
        $("#bestFunction").html("Best Function: "+best.program_to_string())
        $("#bestFitnessText").html("Best Fitness: "+best.fitness)
        $("#averageFitnessText").html("Average Fitness: "+this.population.getAverageFitness())
        bestFn=best.program_to_string();
        plot();

        population.generate();
    
        if(population.finished){
          noLoop();
        }
    }
    
} 

function solveFunction(){
  population=null;
  if(arrayPoints.length>0)
    loop();
}

function stop(){
  population=null;
  arrayPoints = [];
  bestFn = '0';
  
  noLoop();
  plot();
}