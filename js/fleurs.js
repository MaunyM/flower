flowers = [{
  name: 'marguerite',
  petalColor: [255, 255, 255],
  pistilColor: [232, 229, 60]
}, {
  name: 'violette',
  petalColor: [211, 149, 246],
  pistilColor: [252, 255, 180]
}]

function log(title, message) {
  $("#message").append("<div class=\"alert alert-success\"> <strong>" + title + " : </strong>" + message + "</div>");
}

function getRandomFlower() {
  return flowers[getRandomInt(0, flowers.length - 1)]
}

function newGarden(gardenHeight, gardenWidth) {
  var garden = [];
  for (i = 0; i < gardenHeight; i++) {
    garden[i] = []
    for (j = 0; j < gardenWidth; j++) {
      garden[i][j] = [124, 84, 32];
    }
  }
  return garden;
}

function plantFlower(garden, line, column, flower) {
  console.log("on plante une", flower.name)
  garden[line + 1][column] = flower.petalColor;
  garden[line - 1][column] = flower.petalColor;
  garden[line][column] = flower.pistilColor;;
  garden[line][column + 1] = flower.petalColor;
  garden[line][column - 1] = flower.petalColor;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function() {
  var theta = [0, 0, 0];
  var values = [
    [5, 5],
    [18, 17],
    [12, 9],
    [10, 1],
    [15, 1],
    [6, 12]
  ]
  var X = math.matrix(values)

  X = X.resize([6, 3], 1)
  var y = [0, 1, 1, 1, 0, 1];
  X1 = math.resize
  log("X", X);
  log("y", y);
  log("theta", theta);
  log("cost avant", cost(theta, X, y));
  for (i = 0; i < 5000; i++) {
    theta = gradDescent(theta, X, y, 0.1);
  }
  log("theta", theta);
  log("cost apres", cost(theta, X, y));
  log("hypo", hypothesis(theta, [10, 1, 1]));

  var gardenHeight = 10;
  var gardenWidth = 10;
  var nbFlower = 4;
  var data = newGarden(gardenHeight, gardenWidth)
  for (i = 0; i < nbFlower; i++) {
    plantFlower(data, getRandomInt(2, gardenHeight - 2), getRandomInt(2, gardenWidth - 2), getRandomFlower())
  }


  var width = 1000,
    pixelSize = 10;

  var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

  var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", pixelSize * data.length);

  var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i, j) {
      return "translate(0," + i * pixelSize + ")";
    });

  var ligne = bar.selectAll("g").data(function(d, i, j) {
    return d;
  }).enter().append("g").attr("transform", function(d, i, j) {
    return "translate(" + i * pixelSize + ",0)";
  });;
  ligne.append("rect")
    .attr("width", pixelSize)
    .attr("height", pixelSize)
    .style("fill", function(d, i, j) {
      return 'rgb(' + d[0] + ',' + d[1] + ',' + d[2] + ')'
    });

});
