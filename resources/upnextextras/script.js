const templateImg = "./upnextextras/template.png";
const pointImg = "./upnextextras/point.png";
const actionX = 660;
const actionY = 940;
var focusX,focusY;
var count = 0;

function generateImage(){
	var canvas = document.getElementById('myCanvas'),
	context = canvas.getContext('2d');
	
	//Prepare Images to load
	let base_image = new Image();
	let point_image = new Image();
	let waikanae_crest = new Image();
	base_image.src = templateImg;
	point_image.src = pointImg;
	waikanae_crest.id = "Waikanae FC"
	waikanae_crest.src = "./Clubs/Waikanae FC/small.png";
	let images = [base_image, point_image, waikanae_crest]
	
	fetch('./Clubs/clubs.json')
				  .then(response => response.json())
				  .then(files => {
					files.forEach(file => {
					  let temp_crest = new Image();
					  temp_crest.id = file;
					  temp_crest.src = "./Clubs/" + file + "/small.png";
					});
				  })
				  .catch(error => {
					console.error('Error loading files:', error);
				  });
	
	function imageIsLoaded(image) {
	  return new Promise(resolve => {
		image.onload = () => resolve()
		image.onerror = () => resolve()
	  })
	}
	
	Promise.all(images.map(imageIsLoaded)).then(() => {
		//Draw Images
		context.drawImage(base_image, 0, 0);
		
		//startPosition set as half the screen minus half the total width of the blocks
		let startPos = 540 - ((205*count)/2);
		
		for (let i = 1; i <= count; i++) {
 			//Find Values for Matches inputted
 			var home = 'home' + i;
 			var away = 'away' + i;
			var date = 'date' + i;
 			var location = 'location' + i;
 			var time = 'time' + i;
 			var crest = 'crest' + i;
			
			drawMatch(context, startPos, document.getElementById(home).value, document.getElementById(away).value, document.getElementById(date).value, document.getElementById(location).value, document.getElementById(time).value,waikanae_crest,eval(document.getElementById(crest).value));
			startPos += 205;
		}
		
		context.drawImage(point_image, 900, 215);
	});
}

function drawMatch(context, x, home, away, date, location, time, homecrest, crest) {	
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
		let homeLines = home.split(/ /g);
		let homeStartY = 625;
		for (let i = 0; i < homeLines.length; i++) {
			context.fillText(homeLines[i], (x + 100), homeStartY);
			homeStartY += 40;
		}
		let awayLines = away.split(/ /g);
		let awayStartY = 1025;
		for (let i = 0; i < awayLines.length; i++) {
			context.fillText(awayLines[i], (x + 100), awayStartY);
			awayStartY += 40;
		}
		
		//Draw VS Text
		context.font = '30px Oswald';
		context.fillStyle = "#FFFFFF";
		context.fillText("VS", (x + 100), 737.5);
		
		//Setup and create time Text	
		context.fillStyle = "#FFFFFF";
		context.font = '20px Orbitron';
		context.fillText(date, (x + 100), 1150);
		context.font = '30px Orbitron';
		context.fillText(time, (x + 100), 1200);
		context.font = '15px Orbitron';
		context.fillText(location, (x + 100), 1225);
		
		context.drawImage(homecrest, (x + 10), 450);
		context.drawImage(crest, (x + 10), 850);
}

function addMatch(){
 	if(count == 5){ return; }
 	count++;
 	const div = document.createElement('div');
 	div.id = "div" + count;
 	div.innerHTML = `
 	<label for="home${count}">Home Team:</label>
     <input type="text" id="home${count}" name="home${count}"/>
 	<label for="away${count}">Away Team:</label>
 	<input type="text" id="away${count}" name="away${count}"/>
	<label for="date${count}">Date:</label>
 	<input type="text" id="date${count}" name="date${count}"/>
 	<label for="location${count}">Location:</label>
 	<input type="text" id="location${count}" name="location${count}"/>
 	<label for="time${count}">Time:</label>
 	<input type="text" id="time${count}" name="time${count}"/>
 	<label for="crest${count}">Choose a crest for the Opponent:</label>
 	<select name="crest${count}" id="crest${count}"></select><br>
   `;
   var selectElement = document.getElementById('crest${count}');
	
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
   document.getElementById('matches').appendChild(div);
 }