var count = 0;

const templateImg = "./upnextmultitextextras/basetemplate.png";

const textStyleOptions = {
		fontSize: 50,
		fontFamily: "Impact"
};
const miniTextStyleOptions = {
		fontSize: 25,
		fontFamily: "Impact"
};

const tempContainerX = 1300;
const tempContainerY = 150;

function generateImage(){
	var canvas = document.getElementById('myCanvas'),
	context = canvas.getContext('2d');
	
	let base_image = new Image();
	let waikanae_crest = new Image();
	let kcu_crest = new Image();
	let otaki_crest = new Image();
	let paekak_crest = new Image();
	let manakau_crest = new Image();
	base_image.src = templateImg;
	waikanae_crest.src = "./smallclubicons/waikanae.png";
	kcu_crest.src = "./smallclubicons/kcu.png";
	otaki_crest.src = "./smallclubicons/otaki.png";
	paekak_crest.src = "./smallclubicons/paekakariki.png";
	manakau_crest.src = "./smallclubicons/manakau.png";
	
	let images = [base_image,waikanae_crest,kcu_crest,otaki_crest,paekak_crest,manakau_crest];
	
	function imageIsLoaded(image) {
	  return new Promise(resolve => {
		image.onload = () => resolve()
		image.onerror = () => resolve()
	  })
	}
	
	Promise.all(images.map(imageIsLoaded)).then(() => {
		//Draw Images
		context.drawImage(base_image, 0, 0);
		var placementY = (canvas.height/2) - ((tempContainerY/2) * count);
		
		for (let i = 1; i <= count; i++) {
			//Find Values for Matches inputted
			var home = 'home' + i;
			var away = 'away' + i;
			var location = 'location' + i;
			var time = 'time' + i;
			var crest = 'crest' + i;
			
			//Create Temporary Canvas
			var c = document.createElement('canvas');
			c.id = 'temp';
			c.width = tempContainerX;
			c.height = tempContainerY;
			var ctx = c.getContext('2d');
			
			ctx.fillStyle = "#FFFFFF";
			ctx.font = `${textStyleOptions.fontSize}px ${textStyleOptions.fontFamily}`;
			
			//Add Designs for temporary canvas
			ctx.drawImage(waikanae_crest, 25, 0);
			ctx.drawImage(eval(document.getElementById(crest).value), 1100, 0);
			
			var teamString = document.getElementById(home).value + " VS " + document.getElementById(away).value;
			var teamWidth = ctx.measureText(teamString).width;
			ctx.fillText(teamString,(c.width/2) - (teamWidth / 2), 75);
			ctx.font = `${miniTextStyleOptions.fontSize}px ${miniTextStyleOptions.fontFamily}`;
			var timeString = document.getElementById(location).value + " VS " + document.getElementById(time).value;
			var timeWidth = ctx.measureText(timeString).width;
			ctx.fillText(timeString,(c.width/2) - (timeWidth / 2), 125);
			
			ctx.fillStyle = "#e73835";
			ctx.fillRect(c.width/4, 140, (c.width/4) *2, 5)
			
			//Add to Master Canvas
			context.drawImage(c, 0, 0,tempContainerX,tempContainerY,25,placementY,tempContainerX,tempContainerY);
			
			placementY += tempContainerY;
		}
	});
}

function addMatch(){
	if(count == 5){ return; }
	count++;
	const div = document.createElement('div');
	div.id = "div" + count;
	div.innerHTML = `
	<h2>Game ${count}</h2>
	<label for="home${count}">Home Team:</label>
    <input type="text" id="home${count}" name="home${count}"/>
	<label for="away${count}">Away Team:</label>
	<input type="text" id="away${count}" name="away${count}"/>
	<label for="location${count}">Location:</label>
	<input type="text" id="location${count}" name="location${count}"/>
	<label for="time${count}">Time:</label>
	<input type="text" id="time${count}" name="time${count}"/>
	<label for="crest${count}">Choose a crest for the Opponent:</label>
	<select name="crest${count}" id="crest${count}">
		<option value="waikanae_crest">Waikanae</option>
		<option value="kcu_crest">KCU</option>
		<option value="paekak_crest">Paekakariki</option>
		<option value="otaki_crest">Otaki</option>
		<option value="manakau_crest">Manakau</option>
	</select><br>
	<h2>------------------------------------------------</h2>
  `;
  document.getElementById('matches').appendChild(div);
}