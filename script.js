var SIDE_LENGTH = 650;

var canvasNode = document.getElementById('canvas');
canvasNode.width = SIDE_LENGTH;
canvasNode.height = SIDE_LENGTH;
canvasNode.addEventListener('mousedown', startDrag);
canvasNode.addEventListener('mousemove', dragImage);
canvasNode.addEventListener('mouseup', endDrag);

var createBtn = document.getElementById('btn-download');
createBtn.addEventListener('click', generate);
document.getElementById('imageLoader').addEventListener('change', handleImages, false);

document.getElementById('scale').addEventListener('mousemove', scale);
document.getElementById('rot-r').addEventListener('click', rotateClockwise);
document.getElementById('rot-l').addEventListener('click', rotateCounterClockwise);

var canvasPic;

var bg = new Image();
bg.setAttribute('crossOrigin', 'anonymous');
bg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
var overlay = new Image();
overlay.setAttribute('crossOrigin', 'anonymous');
overlay.onload = init;
overlay.src = 'DisneyFrame.png';    

function init() {
    canvasPic = {
        node: canvasNode,
        context: canvasNode.getContext('2d'),
        img: bg,
        imgX: 0,
        imgY: 0,
        imgScl: 1.0,
        width: function() {
            return SIDE_LENGTH*this.imgScl;
        },
        height: function() {
            return (this.img.height/this.img.width)*SIDE_LENGTH*this.imgScl;
        },
        imgRot: 0,
        draw: function() {
            this.context.clearRect(0, 0, SIDE_LENGTH, SIDE_LENGTH);
            this.context.drawImage(bg, 0, 0, SIDE_LENGTH, SIDE_LENGTH);
            this.context.save();
            this.context.translate(SIDE_LENGTH/2, SIDE_LENGTH/2);
            this.context.rotate(this.imgRot*Math.PI/180);
            this.context.drawImage(this.img, -SIDE_LENGTH/2+this.imgX, -SIDE_LENGTH/2+this.imgY, this.width(), this.height());
            this.context.restore();
            this.context.drawImage(overlay, 0, 0, SIDE_LENGTH, SIDE_LENGTH);
        },
        move: function(deltaX, deltaY) {
            if (this.imgRot==0) {
                this.imgX += deltaX;
                this.imgY += deltaY;
            }
            if (this.imgRot==90 || this.imgRot==-270) {
                this.imgX += deltaY;
                this.imgY -= deltaX;
            }
            if (this.imgRot==180 || this.imgRot==-180) {
                this.imgX -= deltaX;
                this.imgY -= deltaY;
            }
            if (this.imgRot==270 || this.imgRot==-90) {
                this.imgX -= deltaY;
                this.imgY += deltaX;
            }
        }
    };
}

function generate() {
	createBtn.href = canvasPic.node.toDataURL('image/png');
	createBtn.download = "profile.png";
}

function handleImages(e) {
    for (var i=0; i<e.target.files.length; i++) {
        var reader = new FileReader();
        reader.onload = (function() {
            return function(e) {
                var img = new Image();
                img.setAttribute('crossOrigin', 'anonymous');
                img.onload = (function() {
                    return function() {
                        canvasPic.img = this;
                        canvasPic.draw();
                    }
                })();
                img.src = e.target.result;
            };
        })();
        reader.readAsDataURL(e.target.files[i]);    
    }
}

var mouse = {
    dragStarted: false,
    x: null,
    y: null,
    getNewCoords: function(e) {
        return {
            x: e.clientX,
            y: e.clientY
        };
    },
    updateCoords: function(x, y) {
        this.x = x;
        this.y = y;
    }
};

function startDrag(e) {
    mouse.dragStarted = true;
    coords = mouse.getNewCoords(e);
    mouse.updateCoords(coords.x, coords.y);
}

function endDrag(e) {
    mouse.dragStarted = false;
}

function dragImage(e) {
    if (mouse.dragStarted) {     
        newCoords = mouse.getNewCoords(e);
        canvasPic.move(newCoords.x-mouse.x, newCoords.y-mouse.y);
        mouse.updateCoords(newCoords.x, newCoords.y);
    }
    canvasPic.draw();
}

function scale(e) {
    canvasPic.imgScl = e.target.value;
    canvasPic.draw();
}

function rotate(direction) {
    canvasPic.imgRot += 90*direction;
    canvasPic.imgRot %= 360;
    canvasPic.draw();
}

function rotateClockwise() {
    rotate(1);
}

function rotateCounterClockwise() {
    rotate(-1);
}
