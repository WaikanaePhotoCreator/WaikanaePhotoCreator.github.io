const templateImg = "./upnextextras/template.png";
const pointImg = "./upnextextras/point.png";
const waikanaeImg = "./smallclubicons/waikanae.png";
const actionX = 660;
const actionY = 940;
var focusX,focusY;

function generateImage(){
	var canvas = document.getElementById('myCanvas'),
	context = canvas.getContext('2d');
	
	//Prepare Images to load
	let base_image = new Image();
	let point_image = new Image();
	let waikanae_image = new Image();
	
	base_image.src = templateImg;
	point_image.src = pointImg;
	waikanae_image.src = waikanaeImg;
	let images = [base_image, point_image, waikanae_image]
	
	function imageIsLoaded(image) {
	  return new Promise(resolve => {
		image.onload = () => resolve()
		image.onerror = () => resolve()
	  })
	}
	
	Promise.all(images.map(imageIsLoaded)).then(() => {
		//Draw Images
		context.drawImage(base_image, 0, 0);
		
		drawMatch(context, 35, waikanae_image);
		drawMatch(context, 240, waikanae_image);
		drawMatch(context, 445, waikanae_image);
		drawMatch(context, 650, waikanae_image);
		drawMatch(context, 855, waikanae_image);
		
		context.drawImage(point_image, 900, 215);
	});
}

function drawMatch(context, x, crest) {	
		//Set Initial Colours
		context.fillStyle = "white";
		context.strokeStyle = "white";
		context.lineWidth = "2";
		
		//Draw Starting White Boxes
		context.fillRect(x,350,200,350);
		context.fillRect(x,750,200,350);	
		context.strokeRect(x,1125, 200,140);
		
		//Setup and create middle red line
		context.strokeStyle = "red";
		context.moveTo(x, 725);
		context.lineTo((x+200), 725);
		context.stroke();
		
		context.textAlign = "center";
		
		//Draw Teams Text
		context.font = '35px Oswald';
		context.fillStyle = "#000000";
		context.fillText("RANGERS", (x + 100), 625);
		context.fillText("SILVERBACKS", (x + 100), 1025);
		
		//Draw VS Text
		context.font = '30px Oswald';
		context.fillStyle = "#FFFFFF";
		context.fillText("VS", (x + 100), 737.5);
		
		//Setup and create time Text
		context.font = '30px Orbitron';
		context.fillStyle = "#FFFFFF";
		context.fillText("12:00PM", (x + 100), 1200);
		context.font = '20px Orbitron';
		context.fillText("WAIKANAE PARK", (x + 100), 1225);
		
		context.drawImage(crest, (x + 10), 450);
		context.drawImage(crest, (x + 10), 850);
}