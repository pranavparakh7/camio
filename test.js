const button = document.querySelector('#screenshot-button');
const img = document.querySelector('#screenshot-img');
const video = document.querySelector('#screenshot-video');
const canvas = document.createElement('canvas');
var w,h;

button.onclick = video.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('image/webp');
  img.onload = function(){
     w = img.naturalWidth;
     h = img.naturalHeight;
  }
};
const constraints = {
  video: true
};
function handleSuccess(stream) {
  video.srcObject = stream;
}
function handleError(error) {
  alert('Reeeejected!', error);
}

navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);

function setup() {
  noLoop();
}

function draw(keypoints) {
  createCanvas(w,h);
  background(0);
  /*noSmooth();

  // Draw white points
  stroke(255);

  for(var i in keypoints){
    strokeWeight(4);
    point(keypoints[i].position.x,keypoints[i].position.y);
  }*/
}
