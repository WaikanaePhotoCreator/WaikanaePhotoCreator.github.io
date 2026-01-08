const halfTemplateImg = "./scoreextras/halfbasetemplate.png";
const fullTemplateImg = "./scoreextras/fullbasetemplate.png";
const actionX = 645;
const actionY = 930;
var focusX,focusY;

function loadActionImage() {
        var input, file, fr, img;

        if (typeof window.FileReader !== 'function') {
            write("The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('imgfile');
        if (!input) {
            write("Um, couldn't find the imgfile element.");
        }
        else if (!input.files) {
            write("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            write("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = createImage;
            fr.readAsDataURL(file);
        }

        function createImage() {
            img = new Image();
            img.onload = imageLoaded;
            img.src = fr.result;
        }

        function imageLoaded() {
            var canvas = document.getElementById("preview")
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img,0,0);
        }

        function write(msg) {
            var p = document.createElement('p');
            p.innerHTML = msg;
            document.body.appendChild(p);
        }
}

function setListener(){
	const canvas = document.getElementById("preview")
		canvas.addEventListener('mousedown', function(e) {
		getCursorPosition(canvas, e)
	})
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    focusX = event.clientX - rect.left;
    focusY = event.clientY - rect.top;
    console.log("x: " + focusX + " y: " + focusY);
	var finalCanvas = document.getElementById('myCanvas'),
	context = finalCanvas.getContext('2d');
	context.drawImage(canvas, focusX-(actionX/2), focusY-(actionY/2),actionX,actionY,355,335,actionX,actionY);
}

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
	
	crest_image.src = "./Clubs/" + crest + "/large.png";
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
		context.drawImage(crest_image, 75, 650);
		
		//Set Constants
		context.textAlign = "center";
		context.textBaseline = "top";
			
		//Draw Scores
		context.font = '220px Audiowide';
		context.fillStyle = "#000000";
		context.fillText(hscore, 200, 400);
		context.fillStyle = "#FFFFFF";
		context.fillText(ascore, 200, 1000);
			
		//Draw Teams
		context.font = '40px Oswald';
		context.fillStyle = "#000000";
		context.fillText(home, 200, 300);
		context.fillStyle = "#FFFFFF";
		context.fillText(away, 200, 900);
	});
}