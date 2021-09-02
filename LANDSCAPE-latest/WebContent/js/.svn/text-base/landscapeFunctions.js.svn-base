/*
 * Functions used in Landscape Application 
 */
var linkOrientation=1;
//Initialize
function initialize() {

}

function imagePreview() {
	/* CONFIG */
		xOffset = -30;
		yOffset = -600;
	/* END CONFIG */
	$("a.preview").hover(function(e){
		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$("body").append("<p id='preview'><img src='"+ this.href +"' alt='Image preview' />"+ c +"</p>");							 
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");						
    },
	function(){
		this.title = this.t;	
		$("#preview").remove();
    });	
	$("a.preview").mousemove(function(e){
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
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
//console.log(d.aodDiagrams);
var diaSplit = d.aodDiagrams.split(":");
if(diaSplit.length == 2){
var diaArray = diaSplit[1].split(",");
if ((diaArray[0].trim() != "" || diaSplit[0].trim() != "" ) && (diaArray[0].trim() != "N/A" || diaSplit[0].trim() != "N/A")){
	for(var i = 0; i < diaArray.length; i++) {
		//var obj = diaArray[i];
		var image_path = "resources/aod_diagram/"+diaSplit[0]+"/"+diaArray[i];
		aodHTML=aodHTML+
	"<a href=\""+image_path+"\" target=\"_blank\" class=\"preview\"><img src=\""+image_path+"\" width=20 height=20 alt=\"AOD thumbnail\" /></a>&nbsp;"
	}
}}else{
	aodHTML=aodHTML+"<i>No diagram provided for this application</i>"
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

//Show the div
document.getElementById(div).style.display = 'block';
//Set the content of the msg to the created html text
document.getElementById('msg').innerHTML=innerHTMLText;
imagePreview();
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
"<b>Interaction:"+d.source.name+"->"+d.target.name+"</b><br>"+
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
//console.log(width+" : "+height+" "+noOfElements);
var graph = d3.nest()
				.key(function(d){return parseInt(d.weight);})
				.sortKeys()
				.entries(graph.applications);
graph.forEach(function(d,i) {
	var positionRadiusScale=d3.scale.log()
								.domain([maxWeight,1])
								.range([20,height/2.5]);
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
  //console.log(e);
  //console.log(i+" : "+a+" : "+b+" : "+r+" : "+thetaInRadian+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
  }
  //console.log(i+" : "+a+" : "+b+" : "+r+" : "+thetaInRadian+" : "+e.name+" : "+e.x+" : "+e.y+" : "+e.weight+" : "+e.fixed);
  theta=theta+angleIncrement;
	});
});
  drawNodes();
  drawLinks(link);
  //fStartTicking=false;
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
//console.log(width+" : "+height+" "+noOfElements);
var yPosnScale = d3.scale.log()
					.domain([1,maxWeight])
					.range([initialY+50,height-30]);
					
var graph = d3.nest()
				.key(function(d){return parseInt(d.weight);})
				.sortKeys()
				.entries(graph.applications);
graph.forEach(function(d,i) {
	currentWeight=parseInt(d.key);//(d.weight===0)?.01:d.weight;
	var majorY = (currentWeight>0)?yPosnScale(currentWeight):initialY;
	var majorX=width/2;
	var xPosnScale = d3.scale.linear()
						.domain([0,d.values.length])
						.range([initialX,(width-initialX)*(maxWeight-currentWeight)/maxWeight]);

	d.values.forEach(function(e,j){
	e.fixed=false;
	var minorX=xPosnScale(j);
	majorX=(minorX>majorX)?majorX:initialX;
	minorX=(minorX>majorX)?minorX-majorX:minorX;
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
fStartTicking=false;
var currentY=30, currentX=30;
var noOfElements=graph.applications.length;
var matrixSize=Math.ceil(Math.sqrt(noOfElements));
//console.log(matrixSize);
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