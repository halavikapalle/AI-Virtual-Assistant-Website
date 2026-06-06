if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
  
    recognition.lang = 'en-US'; 
    recognition.interimResults = false; 
    recognition.continuous = false; 
  
    function speak(text) {

    const synth = window.speechSynthesis;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";

    utterance.volume = 1;

    utterance.rate = 1;

    utterance.pitch = 1;

    const voices = synth.getVoices();

    if(voices.length > 0){
        utterance.voice = voices[0];
    }

    synth.speak(utterance);

}
window.speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
};


   function handleCommand(command) {

    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes("weather in")) {

        const city = lowerCommand.replace("weather in", "").trim();

        if (city) {

            fetch(`https://goweather.herokuapp.com/weather/${city}`)
            .then(response => response.json())
            .then(data => {

                const temperature = data.temperature || "N/A";
                const description = data.description || "No description";

                document.getElementById("city-name").textContent = city;
                document.getElementById("temperature").textContent = temperature;
                document.getElementById("description").textContent = description;

                speak(`The weather in ${city} is ${temperature} with ${description}`);

            })

            .catch(error => {

                console.log(error);

                speak("Weather service unavailable");

            });

        } else {

            speak("Please say a city name.");

        }

    }

    else if (lowerCommand.includes("time")) {

        const time = new Date().toLocaleTimeString();

        speak(`The current time is ${time}`);

    }

    else if (lowerCommand.includes("date")) {

        const date = new Date().toLocaleDateString();

        speak(`Today's date is ${date}`);

    }

    else if (lowerCommand.includes("open youtube")) {

        speak("Opening YouTube");

        window.open("https://youtube.com", "_blank");

    }

    else if (lowerCommand.startsWith("play")) {

        const song =
        lowerCommand.replace("play", "").trim();

        speak(`Playing ${song} on YouTube`);

        window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`,
        "_blank"
        );

    }

    else if (lowerCommand.includes("open spotify")) {

        speak("Opening Spotify");

        window.open("https://spotify.com", "_blank");

    }

    else if (lowerCommand.includes("open google")) {

        speak("Opening Google");

        window.open("https://google.com", "_blank");

    }

    else if (lowerCommand.startsWith("search for")) {

        const query =
        lowerCommand.replace("search for", "").trim();

        speak(`Searching Google for ${query}`);

        window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
        );

    }

    else if (lowerCommand.includes("voice recognition")) {

        speak("Voice recognition is active.");

    }

    else if (lowerCommand.includes("weather updates")) {

        speak("Say weather in followed by city name.");

    }

    else if (lowerCommand.includes("smart search")) {

        speak("You can say search for followed by your query.");

    }

    else if (lowerCommand.includes("youtube control")) {

        speak("You can say open YouTube or play music.");

    }

    else if (lowerCommand.includes("productivity tools")) {

        speak("Opening Pomodoro Timer");

        window.open("pomodoro.html", "_blank");

    }

    else if (lowerCommand.includes("spotify access")) {

        speak("Opening Spotify");

        window.open("https://spotify.com", "_blank");

    }

    else if (
        lowerCommand.includes("hello") ||
        lowerCommand.includes("hi") ||
        lowerCommand.includes("hey")
    ) {

        speak("Hello! I am Wednesday. How can I help you today?");

    }

    else if (lowerCommand.includes("thank you")) {

        speak("You're welcome.");

    }

    else if (lowerCommand.includes("pomodoro")) {

        speak("Opening Pomodoro Timer");

        window.open("pomodoro.html", "_blank");

    }

    else if (lowerCommand.includes("games")) {

        speak("Opening games");

        window.open(
        "https://www.crazygames.com/game/fireboy-and-watergirl-the-forest-temple",
        "_blank"
        );

    }

    else if (lowerCommand.includes("open github")) {

        speak("Opening GitHub");

        window.open("https://github.com", "_blank");

    }

    else if (lowerCommand.includes("open linkedin")) {

        speak("Opening LinkedIn");

        window.open("https://linkedin.com", "_blank");

    }

    else if (lowerCommand.includes("calculator")) {

        speak("Opening Calculator");

        window.open(
        "https://www.google.com/search?q=calculator",
        "_blank"
        );

    }

    else {

        speak("Sorry, I didn't understand that command.");

    }
}
  
    function startListening() {
      recognition.start();
  
      recognition.onstart = () => {
        console.log('Voice recognition started. Speak into the microphone.');
      };
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('You said:', transcript);
        handleCommand(transcript);
      };
  
      recognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
        speak('Sorry, I could not hear you. Please try again.');
      };
  
      recognition.onend = () => {
        console.log('Voice recognition ended.');
        document.getElementById('start-btn').innerText = "🎤 Ask Me";
        // Uncomment the next line if you want continuous listening
        // startListening();
      };
    }
  
    document.getElementById('start-btn').addEventListener('click', () => {

    document.getElementById('start-btn').innerText = "Listening...";
      speak("Listening...");
    startListening();

});
  } else {
    console.error('Web Speech API is not supported in this browser.');
    alert('Sorry, your browser does not support the Web Speech API.');
  }
  
  