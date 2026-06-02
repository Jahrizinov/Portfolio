// =============================================
// AUDIO — Web Audio API with beat detection
// =============================================

let audioContext, analyser, audioSource, audioBuffer;
let gainNode, dataArray, bufferLength;
let isAudioPlaying = false;

export async function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.4;

    const response = await fetch("/audio/mahoraga.mp3");
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    playAudio();
  } catch (e) {
    console.warn("Audio not available:", e);
  }
}

export function playAudio() {
  if (!audioContext || !audioBuffer) return;
  audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  audioSource.loop = true;
  audioSource.connect(analyser);
  analyser.connect(gainNode);
  gainNode.connect(audioContext.destination);
  audioSource.start(0);
  isAudioPlaying = true;
}

export function pauseAudio() {
  if (audioSource && isAudioPlaying) {
    audioSource.stop();
    isAudioPlaying = false;
  }
}

export function resumeAudio() {
  if (!isAudioPlaying) {
    playAudio();
  }
}

export function getAudioLevel() {
  if (!analyser || !dataArray) return 0;
  analyser.getByteFrequencyData(dataArray);
  let sum = 0;
  for (let i = 0; i < bufferLength; i++) {
    sum += dataArray[i];
  }
  return sum / bufferLength / 255; // 0 to 1
}

export function setVolume(value) {
  if (gainNode) {
    gainNode.gain.value = value / 100;
  }
}

export function getIsPlaying() {
  return isAudioPlaying;
}