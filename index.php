<!doctype>
<html>

<head>
	<link rel="stylesheet" href="style.css">
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/camanjs/4.0.0/caman.full.min.js"></script>
	 <script src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v5.0.2.min.js"></script>
</head>

<body>

<div class="container">
	<h1>2017 Homecoming Profile Pictures!</h1>

	<div>
		<b>Upload a picture of yourself!</b>
		
		<input type="file" id="imageLoader" name="imageLoader" >
	<br><br>
	<a href="#" class="button" id="btn-download">Done? Download!</a><br><br>
			<!-- <form method="post" enctype="multipart/form-data">
			<label for="file">Image file:</label>
			<input type="file" name="file" id="file"><br>
			<input type="submit" name="submit" value="Submit">
			</form> -->

			<!-- <input type="button" id="rotate" value="Rotate"> -->
	</div>
	<canvas id="img" width=600 height=600></canvas>
	


</div>


</body>

</html>

<script>
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('img');
var ctx = canvas.getContext('2d');

var frame = new Image();
frame.src = 'frame.png';
frame.onload = function(){
	ctx.drawImage(frame,0,0,600,600);
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            //canvas.width = img.width;
            //canvas.height = img.height;
            var w = 430;
            ctx.drawImage(img,85,163,w,img.height*w/img.width);
           

			ctx.drawImage(frame,0,0,600,600); 
		    Caman("#img", function () {
			  // manipulate image here
			  this.saturation(0).render();
			  this.sepia(50).render();
			});   
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]); 
}


var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
    button.download = "profile.png";
});

/*
$(document).ready(function() {
    


rotate = 0;

$('#rotate').on('click,',function() {
	console.log(rotate);
	if (rotate==0) {
		$('#img').addClass('rotate-90');
		rotate = 90;
	}
	else if (rotate==90) {
		$('#img').addClass('rotate-180');
		rotate=180;
	}
	else if(rotate==180) {
		$('#img').addClass('rotate-270');
		rotate = 270;
	}
	else if (rotate==270) {
		$('#img').removeClass('rotate-270');
		rotate=0;
	}
})
	
})*/
</script>