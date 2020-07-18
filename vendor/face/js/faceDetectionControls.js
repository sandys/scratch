const TINY_FACE_DETECTOR = 'tiny_face_detector'

let selectedFaceDetector = TINY_FACE_DETECTOR

// tiny_face_detector options
let inputSize = 256
let scoreThreshold = 0.5

function getFaceDetectorOptions() {
  return new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

function isFaceDetectionModelLoaded() {
  return !!faceapi.nets.tinyFaceDetector.params
}

async function changeFaceDetector(detector) {
  if (!isFaceDetectionModelLoaded()) {
    await faceapi.nets.tinyFaceDetector.load('/')
  }
}