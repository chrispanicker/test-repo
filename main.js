console.log("Hello World");

var Airtable = require("airtable");
console.log(Airtable);

var base = new Airtable({ apiKey: "key3wySYYU0tXKf12"}).base('appnM2fTZRU6IbXCi');

base("ways").select({}).eachPage(gotPageOfWays, gotAllWays);

const ways = [];

function gotPageOfWays(records, fetchNextPage){
	console.log("gotPageOfWays()");
	ways.push(...records);
	fetchNextPage();
}

function gotAllWays(err){
	console.log("gotAllWays");

	if(err){
		console.log("error loading ways");
		console.error(err);
		return;
	}
	consoleLogWays();
	showWays();
}

function consoleLogWays(){
	console.log("consoleLogWays()");
	ways.forEach((way)=>{
		console.log("Way:",way);
	});
}

function showWays(){
	console.log("showWays()");
	const shelf=document.getElementById("shelf");

	ways.forEach((way)=>{
		const h2=document.createElement("h2");

		h2.innerText=way.fields.name;
		h2.addEventListener("click",() => {
			showWay(way,h2);
		})
		document.body.appendChild(h2);
	});
}


function showWay(way, h2){
	console.log("showWay");

	const wayDetail= document.getElementById("way-detail");

	wayDetail.getElementsByClassName("title")[0].innerText=way.fields.name;
	wayDetail.getElementsByClassName("description")[0].innerText=way.fields.description;
	wayDetail.getElementsByClassName("attachments")[0].src=way.fields.attachments[0].url;

	const shelf=document.getElementById("shelf");
	const wayNames= shelf.getElementsByClassName("active");
	for(const wayName of wayNames){
		wayName.classList.remove("active");
	}
	h2.classList.add("active");
	wayDetail.classList.remove("hidden");
}