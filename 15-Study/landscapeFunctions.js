/*
 * Functions used in Landscape Application 
 */
var linkOrientation=1;
//Initialize
function initialize() {

}

//Display mouse coordinates
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coor = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("status").innerHTML = coor;
}
//Hides a popup
function hide(div) {
	document.getElementById(div).style.display = 'none';
}

//Function:Display application profile
function displayApplicationProfile(div,d) {
//Set the position of the div
document.getElementById(div).style.top='0%';
var left = width-$(".ontop").width();
document.getElementById(div).style.left=left+"px";
//Set the content of the msg to the created html text
document.getElementById('popupTitle').innerHTML="<h3 class=\"appTitle\">Application Profile : "+d.name+"("+d.id+")"+"</h3>";
//Set the content of the msg to the created html text
document.getElementById('appDesc').innerHTML=d.description;

var aodHTML="<b>Application Architeture Diagrams : </b>";
console.log(d.aodDiagrams);
if (d.aodDiagrams!=null){
	for(var i = 0; i < d.aodDiagrams.length; i++) {
		var obj = d.aodDiagrams[i];
		aodHTML=aodHTML+
	"<a href=\""+obj.filename+"\" class=\"preview\"><img src=\""+obj.filename+"\" width=20 height=20 alt=\"AOD thumbnail\" /></a>&nbsp;"
	}
}
document.getElementById('aod').innerHTML=aodHTML;

//Create the inner HTML for the application that was clicked
var innerHTMLText="<table class=\"appTable\">"+
"<tr>"+
"<td valign=\"top\" align=\"left\">"+
"Contact type"+
"</td>"+
"<td width=\"60%\" valign=\"top\" align=\"left\">"+
d.contactType+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Application Availability"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.availability+"<br>"+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Business Owners"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.businessOwners+"<br>"+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Technical  Contacts"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.technicalContacts+"<br>"+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Technology Stack"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.technologyStack+"<br>"+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Servers"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.servers+"<br>"+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Interfaces"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.interfaces+"<br>"+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Remarks"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.remarks+"<br>"+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Status"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.status+"<br>"+
"</td>"+
"</tr><tr>"+
"<td valign=\"top\" align=\"left\">"+
"Portfolio"+
"</td>"+
"<td valign=\"top\" align=\"left\">"+
d.portfolio+"<br>"+
"</td>"+
"</tr>"+
"</table>";
/*
var innerHTMLText="<p>"+
"Application id : "+d.id+"<br>"+
"Description : "+d.description+"<br>"+
"Remarks : "+d.remarks+"<br>"+
"Status : "+d.status+"<br>"+
"Contact type : "+d.contactType+"<br>"+
"Application Availability : "+d.availability+"<br>"+
"Business Owners : "+d.businessOwners+"<br>"+
"Technical  Contacts : "+d.technicalContacts+"<br>"+
"Technology Stack : "+d.technologyStack+"<br>"+
"Servers : "+d.servers+"<br>"+
"Interfaces : "+d.interfaces+"<br>"+
"Portfolio : "+d.portfolio+"<br>"+"</p>";
*/

//Show the div
document.getElementById(div).style.display = 'block';
//Set the content of the msg to the created html text
document.getElementById('msg').innerHTML=innerHTMLText;
}

//Function:Display interaction profile
function displayInteractionProfile(div,d){
//Set the content of the msg to the created html text
document.getElementById('popupTitle').innerHTML="<h3 class=\"appTitle\">Interaction Details</h3>";
//Set the content of the msg to the created html text
document.getElementById('appDesc').innerHTML=d.informationDomain;

var aodHTML="";
document.getElementById('aod').innerHTML=aodHTML;
//Create the inner HTML for the interaction link that was clicked
var innerHTMLText="<p>"+
"domainState: "+d.domainState+"<br>"+
"interactionVehicle: "+d.interactionVehicle+"<br>"+
"informationFlow: "+d.informationFlow+"<br>"+
"interfaceDetails: "+d.interfaceDetails+"<br>"+
"interfaceSchedule: "+d.interfaceSchedule+"<br>"+
"triggerType: "+d.triggerType+"<br>"+
"msgTypeGranularity: "+d.msgTypeGranularity+"<br>"+
"payloadTemplateId: "+d.payloadTemplateId+"<br>"+
"informationLifecycle: "+d.informationLifecycle+"<br>"+
"interfaceEvent: "+d.interfaceEvent+"<br>"+
"messageType: "+d.messageType+"<br>"+
"dataRetention: "+d.dataRetention+"<br>"+
"alert: "+d.alert+"<br>"+
"remarks: "+d.remarks+"<br>"+"</p>";

//Show the div
document.getElementById(div).style.display = 'block';
//Set the content of the msg to the created html text
document.getElementById('msg').innerHTML=innerHTMLText;
}

//Arranges the nodes in concentric circles based on node-degree
function reChartCircle(graph,link) {
var initialX=50, initialY=50;
var maxWeight=0;	  
graph.applications.forEach(function(d,i) {
  maxWeight = (d.weight>maxWeight)?d.weight:maxWeight;
});

var currentWeight=0;
var centreX=viewBoxWidth/2;
var centreY=viewBoxHeight/2;
var r=0, theta=0, thetaInRadian=0;
//ellipse parameters
//a=semi-major-axis, b=semi-minor-axis, c=inter-foci distance
var a=0, b=0;

var flag=1;
var noOfElements=graph.applications.length;
console.log(width+" : "+height+" "+noOfElements);
var graph = d3.nest()
				.key(function(d){return parseInt(d.weight);})
				.sortKeys()
				.entries(graph.applications);
graph.forEach(function(d,i) {
	var positionRadiusScale=d3.scale.log()
								.domain([maxWeight,1])
								.range([20,height/2.5]);
	//console.log(d.key+" : "+d.values.length+" : "+d.values[0]+" : "+i);
//	The data is sorted according to the weight(degree) of the nodes. 
//Hence d.key is the weight of the collection of nodes 
//So r is a fn of the weight of the nodes. For a group of nodes of identical weight the value of r is same.
	b=positionRadiusScale(d.key);
	a=width/height*b;
	p=Math.pow(b,2)/a;
	theta=(100/d.values.length)*Math.random();
	var angleIncrement=360/d.values.length;
	
	d.values.forEach(function(e,j){
	e.fixed=false;
	currentWeight=e.weight;
	theta=(theta>360)?0:theta;
	thetaInRadian=theta*Math.PI/180;
	r=a*b/(Math.sqrt(Math.pow(b*Math.cos(thetaInRadian),2)+Math.pow(a*Math.sin(thetaInRadian),2)));
	//r=p/(1-eccentricity*Math.cos(thetaInRadian));
	var majorY=centreY-r*Math.sin(thetaInRadian);
	var minorY=0;
	var majorX=centreX+r*Math.cos(thetaInRadian);
	var minorX=0;
//special treatment for highest-degree node
	if(currentWeight===maxWeight)
	{
	majorX=centreX;
	majorY=centreY;
	minorX=minorY=0;
	e.fixed=true;
	}
//special treatment for 0-degree nodes - set them at a corner indicating errors 
	if(currentWeight===0)
	{
	majorX=1500;
	majorY=majorY;
	minorX=minorY=0;
	}
  e.y = e.py = majorY+minorY;
  e.x = e.px = majorX+minorX;
  if(e.fixed!=true)
  {
  e.fixed=(e.weight<20)?true:false;
  }
  //Increment theta
  if(e.id=="44")
  {
  console.log(e);
  console.log(i+" : "+a+" : "+b+" : "+r+" : "+thetaInRadian+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
  }
  //console.log(i+" : "+a+" : "+b+" : "+r+" : "+thetaInRadian+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
  theta=theta+angleIncrement;
	});
});
  drawNodes();
  drawLinks(link);
  fStartTicking=false;
}	  

function reChartTree(graph,link) {
var initialX=50, initialY=50;
var maxWeight=0;	
var centreX=viewBoxWidth/2;
//Determine the max degree of the nodes  
graph.applications.forEach(function(d,i) {
  maxWeight = (d.weight>maxWeight)?d.weight:maxWeight;
});

var currentWeight=0;
var flag=1;
var noOfElements=graph.applications.length;
console.log(width+" : "+height+" "+noOfElements);
var yPosnScale = d3.scale.log()
					.domain([1,maxWeight])
					.range([initialY+50,height-30]);
					
var graph = d3.nest()
				.key(function(d){return parseInt(d.weight);})
				.sortKeys()
				.entries(graph.applications);
graph.forEach(function(d,i) {
console.log(d.key+" : "+d.values.length+" : "+d.values[0]+" : "+i);
//	The data is sorted according to the weight(degree) of the nodes. 
//Hence d.key is the weight of the collection of nodes 
	currentWeight=parseInt(d.key);//(d.weight===0)?.01:d.weight;
	var majorY = (currentWeight>0)?yPosnScale(currentWeight):initialY;
	//console.log(currentWeight+" : "+yPosnScale(currentWeight));
	//var majorX=0;
	var majorX=width/2;
	//majorX=(d.values.length>1)?majorX:(majorX+100*Math.random());
	var xPosnScale = d3.scale.linear()
						.domain([0,d.values.length])
						.range([initialX,(width-initialX)*(maxWeight-currentWeight)/maxWeight]);
	//var majorY=height*(currentWeight/maxWeight)*.8+parseInt(d.id);
	//var minorY=height*((maxWeight-currentWeight)/maxWeight)*.1*Math.random();

	d.values.forEach(function(e,j){
	e.fixed=false;
	
	//var minorX=((flag>0)?1:-1)*xPosnScale((j));
	var minorX=xPosnScale(j);
	majorX=(minorX>majorX)?majorX:initialX;
	minorX=(minorX>majorX)?minorX-majorX:minorX;
	
//special treatment for highest-degree nodes
	if(currentWeight===maxWeight)
	{
	majorX=centreX;
	minorX=0;
	e.fixed=true;
	}
	var minorY=0;
  e.y = e.py = majorY+minorY;
  e.x = e.px = majorX+minorX;
  if(e.fixed!=true)
  {
  e.fixed=(e.weight<20)?true:false;
  }
  if(e.id=="101")
  {
  console.log(e);
  console.log(i+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
  }
  flag=(flag>0)?0:1;
  console.log(i+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
	});

});
  drawNodes();
  drawLinks(link);
}	  

function reChartFixedPosition(graph,link) {
var currentY=30, currentX=30;
var noOfElements=graph.applications.length;
var matrixSize=Math.ceil(Math.sqrt(noOfElements));
console.log(matrixSize);
var currentRow=0, currentCol=0;
var maxRadius=0;	  
var gap=40;
graph.applications.forEach(function(d,i) {
  maxRadius = (d.radius>maxRadius)?d.radius:maxRadius;
});
graph.applications.forEach(function(d,i) {
  currentX=currentX+2*maxRadius;
  d.y = currentY+(currentRow*maxRadius)+2*gap;
  d.x = currentX+gap;
  console.log(i+" : "+d.name+" : "+d.x+" : "+d.y+" : "+d.weight);
  currentRow=(currentCol<matrixSize)?currentRow:currentRow+1;
  currentCol=(currentCol<matrixSize)?currentCol+1:0;
  currentX=(currentCol==0)?currentX=30:currentX;
  drawNodes();
  drawLinks(link);
});
}	  

/* Physically Draw the Links */
function drawNodes()
{
	d3.selectAll("circle").attr("cx", function (d) {
		//d.x = Math.max(radius, Math.min(width - radius, d.x));
  if(d.id=="101")
  {
//    console.log(d);
//console.log(d.id+" : "+d.name+" : "+d.x+" : "+d.y+" : "+d.weight+" : "+d.fixed);
  }
        return isNaN(d.x)?defaultX:d.x;
    })
        .attr("cy", function (d) {
		//d.y = Math.max(radius, Math.min(height - radius, d.y));
		return isNaN(d.y)?defaultY:d.y;
    });
    d3.selectAll("text").attr("x", function (d) {
		//d.x = initialX+((width*2/3)*Math.random())+d.id;
		//d.x = Math.max(radius, Math.min(width - radius, d.x));
        return isNaN(d.x)?defaultX:d.x;
    })
        .attr("y", function (d) {
		//d.y = initialY+(height-200)*Math.random()+d.id;
		//d.y = Math.max(radius, Math.min(height - radius, d.y));
		return isNaN(d.y)?defaultY:d.y;
    });
}
/* Physically Draw the Links */
function drawLinks(link)
{
    link.attr("x1", function(d) { return isNaN(d.source.x)?defaultX:d.source.x; })
        .attr("y1", function(d) { return isNaN(d.source.y)?defaultY:d.source.y; })
        .attr("x2", function(d) { return isNaN(d.target.x)?defaultX:d.target.x; })
        .attr("y2", function(d) { return isNaN(d.target.y)?defaultY:d.target.y; });
if (curvedLinks){
	link.attr("d", function(d) {
		var even=d.source.id%2;
		var intermediateX=d.source.x+((even==0)?1:-1)*(100);
		//console.log(d.source.name+":"+d.target.name+" intermediateX: "+intermediateX);
		//console.log(even+":"+d);
	  linkOrientation=linkOrientation*-1;	
      return "M" + d.source.x + "," + d.source.y
          + "S" + intermediateX + "," + d.source.y
          + " " + d.target.x + "," + d.target.y;
    });
}
}

function sortLinks(links)
{                               
    links.sort(function(a,b) {
        if (a.source > b.source) 
        {
            return 1;
        }
        else if (a.source < b.source) 
        {
            return -1;
        }
        else 
        {
            if (a.target > b.target) 
            {
                return 1;
            }
            if (a.target < b.target) 
            {
                return -1;
            }
            else 
            {
                return 0;
            }
        }
    });
}

function primaryFunction(error, graph)
{

//Append the links one by one
var linkType=(curvedLinks)?"path":"line";
var link = svg.selectAll(".link")
      .data(graph.interactions)
    .enter().append(linkType)		//for-each data append a line
      .attr("class", "link")	//set the HTML5 attribute of the CSS object .link
  	  .on('click', function(d){displayInteractionProfile('applicationProfile',d);}) //AMC:For click-to-fade
	  .style("marker-end",  "url(#suit)"); // To draw the arrow heads 

var foo=document.getElementById('cmdRectangular');	  
if (foo.addEventListener) 
    foo.addEventListener('click',reChartFixedPosition(graph,link),false); //everything else
	document.getElementById('cmdRectangular').setAttribute("onclick","javascript:reChartFixedPosition(graph,link);");


	  sortLinks(graph.interactions);
//Set nodes and edges to the force layout  
  force
      .nodes(graph.applications)
      .links(graph.interactions)
      .start()
	  ;

//To detect escape button : 'Esc' hit will hide the application/interaction popup
document.onkeydown = function(evt) {
	evt = evt || window.event;
	if (evt.keyCode == 27) {
		hide('applicationProfile');
	}
};

var drag = force.drag()
			.on("dragstart", dragstart);
			
//Append the nodes/applications one by one
  var node = svg.selectAll(".node")
      .data(graph.applications,function(d) { return d.id; })
    .enter().append("g")	//g is the graphics-container to hold the shape(circle) and the text within it
      .attr("class", "node")
//      .call(force.drag)
      .call(drag)
	  ;

//Setting the scale for the radius of the circles	  
var radiusScale=d3.scale.linear()
					.domain([0,50])    //map this domain
					.range([15,30]);   //to this range

//Add a circle to the graphics-container g for each node
  var circleNode = node.append("circle")
      .attr("r", function(d){d.radius=radiusScale(d.weight); return d.radius;})
      .style("fill", function(d) { return color(d.portfolio); })
  	  .on('click', function(d){displayApplicationProfile('applicationProfile',d);}) //AMC:For click-to-fade
  	  .on('dblclick', connectedNodes) //AMC:For doubleclick-to-fade
	  
	  ;
	node.append("text")
		//.attr("dx", function(d){console.log("radius: "+(10+(d.weight)));return -(10+(d.weight))+5;})
		.attr("y", ".35em")
		.attr("class","labeltext")
		.text(function(d){return d.shortName});

//reChartFixedPosition(graph,link);
reChartCircle(graph,link);
//reChartTree(graph,link);

//Add tooltip text to each node
  node.append("title")
      .text(function(d,event) { return d.id+": "+d.name+"("+d.x+","+d.y+")"+"("+d.weight+")"; });
//Add tooltip text to each link
  link.append("title")
      .text(function(d) { return (
d.source.name+"->"+d.target.name+"\n"+
"informationDomain: "+d.informationDomain+"\n"+
"interactionVehicle: "+d.interactionVehicle+"\n"+
"interfaceEvent: "+d.interfaceEvent); });

//Force Layout parameters setup
  force.on("tick", function() {
  if(fStartTicking)
  {
	drawNodes();
	drawLinks(link);
  }
	node.each(collide(.5)); //Added so that the nodes stayed apart from each other
});

if (directionalLinks) {
//Append arrow-head markers to the links where a directional attribute is available  
svg.append("defs").selectAll("marker")
    .data(["suit", "licensing", "resolved"])
  .enter().append("marker")
    .attr("id", function(d) { console.log(d); return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 75)
    .attr("refY", 0)
    .attr("markerWidth", arrowHeadWidth)
    .attr("markerHeight", arrowHeadHeight)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5 L10,0 L0,5")
	.style("fill","#777777")
    .style("stroke", "#777777")
    .style("opacity", "1");
}
//Code piece to keep the application nodes separate from each-other	
var padding =1, // separation between circles
    radius=8;
function collide(alpha) {
  var quadtree = d3.geom.quadtree(graph.applications);
  return function(d) {
    var rb = 2*d.radius + padding,
        nx1 = d.x - rb,
        nx2 = d.x + rb,
        ny1 = d.y - rb,
        ny2 = d.y + rb;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y);
          if (l < rb) {
          l = (l - rb) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

/*	
//AMC:This is for the fisheye view - Start
var fisheye = d3.fisheye.circular()
      .radius(120);
	  console.log(fisheye);
svg.on("mousemove", function() {
      force.stop();
      fisheye.focus(d3.mouse(this));
      d3.selectAll("circle").each(function(d) { d.fisheye = fisheye(d); })
          .attr("cx", function(d) { return d.fisheye.x; })
          .attr("cy", function(d) { return d.fisheye.y; })
          .attr("r", function(d) { return d.fisheye.z * 8; });
      link.attr("x1", function(d) { return d.source.fisheye.x; })
          .attr("y1", function(d) { return d.source.fisheye.y; })
          .attr("x2", function(d) { return d.target.fisheye.x; })
          .attr("y2", function(d) { return d.target.fisheye.y; });
    });  
//AMC:This is for the fisheye view - End
*/

//AMC:This is for the doubleclick-to-fade - Start
//Toggle stores whether the highlighting is on
var toggle = 0;
//Create an array logging what is connected to what
var linkedByIndex = {};
for (i = 0; i < graph.applications.length; i++) {
    linkedByIndex[i + "," + i] = 1;
};
graph.interactions.forEach(function (d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});
//This function looks up whether a pair are neighbours
function neighboring(a, b) {
    return linkedByIndex[a.index + "," + b.index];
}
function connectedNodes() {
    if (toggle == 0) {
        //Reduce the opacity of all but the neighbouring nodes
        d = d3.select(this).node().__data__;
        node.style("opacity", function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
        });
        link.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
        });
        //Reduce the op
        toggle = 1;
    } else {
        //Put them back to opacity=1
        node.style("opacity", 1);
        link.style("opacity", 1);
        toggle = 0;
    }
}	
//AMC:This is for the doubleclick-to-fade - End

/* Add drag & zoom behaviours  - not working yet*/
/* Yet to write the functions dragmove and dragzoom */
    svg.call( d3.behavior.drag()
	      .on("drag",dragmove) );
    svg.call( d3.behavior.zoom()
	      .x(xScale)
	      .y(yScale)
	      .scaleExtent([1, 6])
	      .on("zoom", doZoom) );


}   