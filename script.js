// Get HTML elements
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const audioPlayback = document.getElementById('audioPlayback');

let mediaRecorder;
let audioChunks = [];

// Request access to the user's microphone
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        // When the media recorder has data available, store it in audioChunks
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        // When the recording stops, create a Blob from the audio data
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioChunks = []; // Reset the audioChunks array for future recordings
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioUrl;
        };
    });

// Start recording when the record button is clicked
recordButton.addEventListener('click', () => {
    mediaRecorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
});

// Stop recording when the stop button is clicked
stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
});