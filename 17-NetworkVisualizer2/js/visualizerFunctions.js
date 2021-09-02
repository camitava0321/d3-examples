/*
 * Functions used in Landscape Application 
 */
var main_debug=true; 
var fStartTicking=false;
var linkOrientation=1;
//Initialize
function initialize() {

}

//Display mouse coordinates
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coor = "X: " + x + ", Y: " + y;
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
document.getElementById('popupTitle').innerHTML="<h3 class=\"appTitle\">"+d.name+"("+d.id+")"+"</h3>";
//Set the content of the msg to the created html text
document.getElementById('appDesc').innerHTML=d.description;

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
"</tr>"+
"</table>";

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
graph.devices.forEach(function(d,i) {
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
var noOfElements=graph.devices.length;
//console.log(width+" : "+height+" "+noOfElements);
var graph = d3.nest()
				.key(function(d){return parseInt(d.weight);})
				.sortKeys()
				.entries(graph.devices);
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
	majorY=40+22*j;
	//console.log(majorX+":"+majorY);
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
  //console.log(e);
  //console.log(i+" : "+a+" : "+b+" : "+r+" : "+thetaInRadian+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
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
graph.devices.forEach(function(d,i) {
  maxWeight = (d.weight>maxWeight)?d.weight:maxWeight;
});

var currentWeight=0;
var flag=1;
var noOfElements=graph.devices.length;
//console.log(width+" : "+height+" "+noOfElements);
var yPosnScale = d3.scale.log()
					.domain([1,maxWeight])
					.range([initialY+50,height-30]);
					
var graph = d3.nest()
				.key(function(d){return parseInt(d.weight);})
				.sortKeys()
				.entries(graph.devices);
graph.forEach(function(d,i) {
//console.log(d.key+" : "+d.values.length+" : "+d.values[0]+" : "+i);
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
  e.fixed=(e.weight<5)?true:false;
  }
  if(e.id=="101")
  {
  //console.log(e);
  //console.log(i+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
  }
  flag=(flag>0)?0:1;
  //console.log(i+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
	});

});
  drawNodes();
  drawLinks(link);
}	  

function reChartFixedPosition(graph,link) {
var currentY=30, currentX=30;
var noOfElements=graph.devices.length;
var matrixSize=Math.ceil(Math.sqrt(noOfElements));
//console.log(matrixSize);
var currentRow=0, currentCol=0;
var maxRadius=0;	  
var gap=40;
graph.devices.forEach(function(d,i) {
  maxRadius = (d.radius>maxRadius)?d.radius:maxRadius;
});
graph.devices.forEach(function(d,i) {
  currentX=currentX+2*maxRadius;
  d.y = currentY+(currentRow*maxRadius)+2*gap;
  d.x = currentX+gap;
  //console.log(i+" : "+d.name+" : "+d.x+" : "+d.y+" : "+d.weight);
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
//Setting the scale for the x of the circles	  
var xScale=d3.scale.linear()
					.domain([0,width])    //map this domain
					.range([defaultX,width]);   //to this range

	d3.selectAll("circle").attr("cx", function (d) {
		//d.x = Math.max(radius, Math.min(width - radius, d.x));
  if(d.id=="101")
  {
//    console.log(d);
//console.log(d.id+" : "+d.name+" : "+d.x+" : "+d.y+" : "+d.weight+" : "+d.fixed);
  }		
		d.x=isNaN(d.x)?defaultX:d.x;
		if(d.x>width)
		{
		d.x=xScale(d.x);
		}
//console.log(d.id+" : "+d.name+" : "+d.x+" : "+d.y);
        return d.x;
    })
        .attr("cy", function (d) {
		//d.y = Math.max(radius, Math.min(height - radius, d.y));
		return isNaN(d.y)?defaultY:d.y;
    });
    d3.selectAll("text").attr("x", function (d) {
		d.x=isNaN(d.x)?defaultX:d.x;
		if(d.x>width)
		{
		d.x=xScale(d.x);
		}
        return d.x;
    })
        .attr("y", function (d) {
		//d.y = initialY+(height-200)*Math.random()+d.id;
		//d.y = Math.max(radius, Math.min(height - radius, d.y));
		return isNaN(d.y)?defaultY:d.y;
    });
}
/* Physically Draw the Links */
function drawLinks()
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

function startTicking() {
	//fStartTicking=(fStartTicking===true)?false:true;
	fStartTicking=!fStartTicking;
	consoleLog('Should I start ticking? '+fStartTicking);
}

function consoleLog(logString) {
	if (main_debug) {
	console.log(logString);
	}
}   