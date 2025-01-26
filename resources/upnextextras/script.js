const templateImg = "./upnextextras/template.png";
const pointImg = "./upnextextras/point.png";
const actionX = 660;
const actionY = 940;
var focusX,focusY;

function generateImage(){
	var canvas = document.getElementById('myCanvas'),
	context = canvas.getContext('2d');
	
	//Prepare Images to load
	let base_image = new Image();
	let point_image = new Image();
	
	base_image.src = templateImg;
	point_image.src = pointImg;
	let images = [base_image, point_image]
	
	function imageIsLoaded(image) {
	  return new Promise(resolve => {
		image.onload = () => resolve()
		image.onerror = () => resolve()
	  })
	}
	
	Promise.all(images.map(imageIsLoaded)).then(() => {
		//Draw Images
		context.drawImage(base_image, 0, 0);
		
		context.fillStyle = "white";
		context.fillRect(45,360,200,350);
		context.fillRect(45,785,200,350);
		context.strokeStyle = "white";
		context.lineWidth = "2";
		context.strokeRect(45,1175, 200,140);
		
		context.strokeStyle = "red";
		context.moveTo(45, 747.5);
		context.lineTo(245, 747.5);
		context.stroke();
		
		context.drawImage(point_image, 900, 215);
	});
}