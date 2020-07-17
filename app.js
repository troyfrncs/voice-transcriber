const btn = document.querySelector('.talk');
const content = document.querySelector ('.content');
const status = document.querySelector ('.status');
const btnClear = document.querySelector ('.clear');
const statusText = `Press the button to start speech recognition.`;

const greetings = [
  'Greeting Test 1',
  'Greeting Test 2',
  'Greeting Test 3',
];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

status.innerHTML = statusText;

recognition.onstart = () => {
  status.innerHTML = 'Listening...';
}

recognition.onend = () => {
  status.innerHTML = 'Speech Recognition Stopped.';
  btn.classList.remove('abort');
  setTimeout(() => {
    status.innerHTML = statusText;
  }, 2000)
}

recognition.onresult = (event) => {
  const current = event.resultIndex;

  const transcript = event.results[current][0].transcript;
  content.textContent += ` ` + transcript + ` `;

  readOutLoud(transcript);
}

// Add event listener on Button

btn.addEventListener('click', () => {
  if (btn.classList.contains('abort')) {
    recognition.abort();
    btn.classList.remove('abort');
  } else {
    recognition.start();
    btn.classList.add('abort');
  }
});

// Clear button condition

btnClear.addEventListener('click', () => {
  content.innerHTML = ``;
});

const readOutLoud = (message) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message;

  if(message.includes('Good Morning')) {
    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}