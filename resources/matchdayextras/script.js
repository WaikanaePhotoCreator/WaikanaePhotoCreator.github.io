const templateImg = "./matchdayextras/template.png";
const actionX = 660;
const actionY = 940;
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

function populateSelect(){
	var selectElement = document.getElementById('crest');
	
	fetch('./Clubs/clubs.json')
      .then(response => response.json())
      .then(files => {
        files.forEach(file => {
		  selectElement.add(new Option(file));
        });
      })
      .catch(error => {
        console.error('Error loading files:', error);
      });
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    focusX = event.clientX - rect.left;
    focusY = event.clientY - rect.top;
    console.log("x: " + focusX + " y: " + focusY);
	var finalCanvas = document.getElementById('myCanvas'),
	context = finalCanvas.getContext('2d');
	context.drawImage(canvas, focusX-(actionX/2), focusY-(actionY/2),actionX,actionY,355,355,actionX,actionY);
}

function generateImage(home,away,crest,placetext,timetext){
	var canvas = document.getElementById('myCanvas'),
	context = canvas.getContext('2d');
	
	//Prepare Images to load
	let base_image = new Image();
	let crest_image = new Image();
	
	base_image.src = templateImg;
	
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
		context.drawImage(crest_image, 70, 850);
		
		//Set Constants
		context.textAlign = "center";
		context.textBaseline = "top";
			
		//Draw Teams
		context.font = '40px Oswald';
		context.fillStyle = "#000000";
		context.fillText(home, 195, 625);
		context.fillText(away, 195, 1075);
		
		//Draw Time and Location
		context.font = '40px Orbitron';
		context.fillStyle = "#FFFFFF";
		context.fillText(timetext, 195, 1195);
		context.font = '20px Orbitron';
		context.fillText(placetext, 195, 1245);
	});
}