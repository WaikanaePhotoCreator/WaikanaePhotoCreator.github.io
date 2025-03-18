const halfTemplateImg = "./textscoreextras/halfbasetemplate.png";
const fullTemplateImg = "./textscoreextras/fullbasetemplate.png";

function generateImage(home,away,crest,hscore,ascore,fullorhalf){
	var canvas = document.getElementById('myCanvas'),
	context = canvas.getContext('2d');
	
	//Prepare Images to load
	let base_image = new Image();
	let crest_image = new Image();
	
	console.log(fullorhalf);
	if(fullorhalf == "full"){
		base_image.src = fullTemplateImg;
	}else if(fullorhalf == "half"){
		base_image.src = halfTemplateImg;
	}
	
	crest_image.src = "./clubicons/" + crest + ".png";
	let images = [base_image, crest_image]
	
	function imageIsLoaded(image) {
	  return new Promise(resolve => {
		image.onload = () => resolve()
		image.onerror = () => resolve()
	  })
	}
	
	Promise.all(images.map(imageIsLoaded)).then(() => {
		//Draw Images
		context.drawImage(base_image, 0, 0);
		context.drawImage(crest_image, 760, 1050);
		
		//Set Constants
		context.textAlign = "center";
		context.textBaseline = "top";
			
		//Draw Scores
		context.font = '220px Audiowide';
		context.fillStyle = "#000000";
		context.fillText(hscore, 300, 450);
		context.fillStyle = "#FFFFFF";
		context.fillText(ascore, 800, 750);
			
		//Draw Teams
		context.font = '40px Oswald';
		context.fillStyle = "#000000";
		context.fillText(home, 200, 300);
		context.fillStyle = "#FFFFFF";
		context.fillText(away, 890, 1025);
	});
}