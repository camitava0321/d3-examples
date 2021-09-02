var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return d.data.zodiacName + ": <span style='color:orangered'>" + d.data.score + "</span>";
  });

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) { 
    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
  });

var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

d3.csv('data.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.zodiacName  =  d.zodiacName;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
  var path = svg.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  


  // calculate the weighted mean score
  var score = 
    data.reduce(function(a, b) {
      //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
      return a + (b.score * b.weight); 
    }, 0) / 
    data.reduce(function(a, b) { 
      return a + b.weight; 
    }, 0);

/*	
  svg.append("svg:text")
    .attr("class", "zodiac-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text("EARTH");
*/
var tipVenus = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return "venus";
  });
  svg.call(tipVenus);
  var venus = svg.append("circle")
	.attr("cx","-60px")
	.attr("cy","-60px")
	.attr("r","7px")
	.attr("fill","aliceblue")
      .on('mouseover', tipVenus.show)
      .on('mouseout', tipVenus.hide);
  var mars = svg.append("circle")
	.attr("cx","-30px")
	.attr("cy","-100px")
	.attr("r","10px")
	.attr("fill","#800000")
      .on('mouseover', tipVenus.show)
      .on('mouseout', tipVenus.hide);
  var mercury = svg.append("circle")
	.attr("cx","5px")
	.attr("cy","-120px")
	.attr("r","5px")
	.attr("fill","#522900")
      .on('mouseover', tipVenus.show)
      .on('mouseout', tipVenus.hide);
  var jupiter = svg.append("svg:image")
	.attr("x","85px")
	.attr("y","-120px")
	.attr("width","50px")
	.attr("height","50px")
	.attr("xlink:href","jupiter.png")
      .on('mouseover', tipVenus.show)
      .on('mouseout', tipVenus.hide);

  var saturn = svg.append("circle")
	.attr("cx","175px")
	.attr("cy","-70px")
	.attr("r","40px")
	.attr("fill","#001F5C")
      .on('mouseover', tipVenus.show)
      .on('mouseout', tipVenus.hide);
  var uranus = svg.append("circle")
	.attr("cx","185px")
	.attr("cy","40px")
	.attr("r","30px")
	.attr("fill","#52CCCC")
      .on('mouseover', tipVenus.show)
      .on('mouseout', tipVenus.hide);
  var neptune = svg.append("circle")
	.attr("cx","-30px")
	.attr("cy","210px")
	.attr("r","24px")
	.attr("fill","#0052CC")
      .on('mouseover', tipVenus.show)
      .on('mouseout', tipVenus.hide);
	
  svg.append("svg:image")
	.attr("x","-75px")
	.attr("y", "-75px")
	.attr("width","150px")
	.attr("height","150px")
	.attr("xlink:href","earth.png");
	
});