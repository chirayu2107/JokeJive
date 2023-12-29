const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');
const speakBtn = document.getElementById('speakBtn');
const audio = document.getElementById('audioplayer');

jokeBtn.addEventListener('click', generateJoke);
speakBtn.addEventListener('click', speakJoke);

generateJoke();

// USING ASYNC/AWAIT
async function generateJoke() {
    const config = {
        headers: {
            Accept: 'application/json',
        },
    };

    const res = await fetch('https://icanhazdadjoke.com', config);
    const data = await res.json();

    jokeEl.innerHTML = data.joke;
}

function speakJoke() {
    const textToRead = jokeEl.innerText;

    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        
        // Create a new instance of SpeechSynthesisUtterance
        const utterance = new SpeechSynthesisUtterance(textToRead);

        // Event listener to re-enable the speak button when speech ends
        utterance.addEventListener('end', function () {
            speakBtn.disabled = false;
        });

        // Event listener for handling errors
        utterance.addEventListener('error', function (event) {
            console.error('SpeechSynthesisUtterance Error:', event.error);
        });

        // Start speech synthesis
        synth.speak(utterance);

        // Disable the speak button while speech is playing
        speakBtn.disabled = true;
    } else {
        alert('Sorry, your browser does not support the Web Speech API.');
    }
}
