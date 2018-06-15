const button = document.querySelector('#screenshot-button');
const img = document.createElement('img');
const video = document.querySelector('#screenshot-video');
const canvas = document.createElement('canvas');
var imageScaleFactor = 0.5;
var outputStride = 16;
var flipHorizontal = false;

button.onclick = video.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('image/webp');
  posenet.load().then(function(net){
    return net.estimateSinglePose(img, imageScaleFactor, flipHorizontal, outputStride)
  }).then(function(pose){
    alert(pose.keypoints);
    draw(pose.keypoints);
  })
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
  createCanvas(canvas.width,canvas.height);
  background(200);
  noSmooth();

  // Draw white points
  stroke(0);

  for(var i in keypoints){
    strokeWeight(4);
    point(keypoints[i].position.x,keypoints[i].position.y);
  }
}
