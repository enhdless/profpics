var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('img');
var ctx = canvas.getContext('2d');

var frame = new Image();
frame.src = 'hc2014.png';
frame.onload = function(){
	ctx.drawImage(frame,0,0,600,600);
}

var img;
var imgX = 85;
var imgY = 163;
var imgRot = 0;
var r = 430;
function handleImage(e){
	$('.edit').removeAttr('disabled');
	canvas.width = 600;
    var reader = new FileReader();
    reader.onload = function(event){
        img = new Image();
        img.onload = function(){
            ctx.drawImage(img,imgX,imgY,r,img.height*r/img.width);
			ctx.drawImage(frame,0,0,600,600); 
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]); 
}


$('#up').on('click',function() {
	if (imgRot==0) imgY -= 10;
	if (imgRot==90 || imgRot==-270) imgX -= 10;
	if (imgRot==180 || imgRot==-180) imgY += 10;
	if (imgRot==270 || imgRot==-90) imgX += 10;
	redraw();
});
$('#down').on('click',function() {
	if (imgRot==0) imgY += 10;
	if (imgRot==90 || imgRot==-270) imgX += 10;
	if (imgRot==180 || imgRot==-180) imgY -= 10;
	if (imgRot==270 || imgRot==-90) imgX -= 10;
	redraw();
});
$('#left').on('click',function() {
	if (imgRot==0) imgX -= 10;
	if (imgRot==90 || imgRot==-270) imgY += 10;
	if (imgRot==180 || imgRot==-180) imgX += 10;
	if (imgRot==270 || imgRot==-90) imgY -= 10;
	redraw();
});
$('#right').on('click',function() {
	if (imgRot==0) imgX += 10;
	if (imgRot==90 || imgRot==-270) imgY -= 10;
	if (imgRot==180 || imgRot==-180) imgX -= 10;
	if (imgRot==270 || imgRot==-90) imgY += 10;
	redraw();
});
$('#rot-r').on('click',function() {
	imgRot = imgRot==270 ? 0 : imgRot+=90;
	redraw();
});
$('#rot-l').on('click',function() {
	imgRot = imgRot==-270 ? 0 : imgRot-=90;
	redraw();
});
$('#bigger').on('click',function() {
	r += 10;
	redraw();
});
$('#smaller').on('click',function() {
	r -= 10;
	redraw();
});

function redraw() {
	canvas.width = 600;
	ctx.save();
	ctx.translate(300,300);
	ctx.rotate(imgRot*Math.PI/180);
    ctx.drawImage(img,-300+imgX,-300+imgY,r,img.height*r/img.width);
    ctx.restore();
	ctx.drawImage(frame,0,0,600,600); 
	done = 0;

}

done = 0;
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
	if(!done) {
		Caman("#img", function () {
			this.saturation(0);
			this.sepia(50).render();
		});
	}
	if (done==2) {
		console.log('asdf');
		var dataURL = canvas.toDataURL('image/png');
	    button.href = dataURL;
	    button.download = "profile.png";
	}
});


Caman.Event.listen("processComplete", function (job) {
	console.log("Finished:", job.name);
	done++;
	if (done==2) {
		setTimeout(function() {
			button.click();
		},500);	
	}
});