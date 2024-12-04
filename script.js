const sounds = {
    black: new Audio('./assets/Sonidos/black.wav'),
    red: new Audio('./assets/Sonidos/red.wav'),
    yellow: new Audio('./assets/Sonidos/yellow.wav'),
    brown: new Audio('./assets/Sonidos/brown.wav'),
    purple: new Audio('./assets/Sonidos/purple.wav'),
    orange: new Audio('./assets/Sonidos/orange.wav'),
    pink: new Audio('./assets/Sonidos/pink.mp3'),
    green: new Audio('./assets/Sonidos/green.wav'),
    blue: new Audio('./assets/Sonidos/blue.wav'),
    grey: new Audio('./assets/Sonidos/grey.wav'),
    gold: new Audio('./assets/Sonidos/gold.wav'),
};
let votes = {
    black: 0,
    red: 0,
    yellow: 0
};

let timer;
let timeoutDuration = 10000; 
const colorButtons = document.querySelectorAll(".color");
const resetButton = document.getElementById("reset");
const toggleNewColorsButton = document.getElementById("toggle-new-colors");
const newColorSection = document.getElementById("new-color-section");
const title = document.getElementById("title");
const voteList = document.getElementById("vote-list");
const popularColor = document.getElementById("popular-color");

function changeTitleColor(color) {
    title.style.color = color;
    playSound(color);
    incrementVote(color); 
    resetTimer(); 
}

function incrementVote(color) {
    votes[color]++; 
    updateVoteList();
    updatePopularColor();
}

function updateVoteList() {
    voteList.innerHTML = "";
    for (let color in votes) {
        const li = document.createElement("li");
        li.textContent = `${color}: ${votes[color]} votos`;
        voteList.appendChild(li);
    }
}

function updatePopularColor() {
    const popular = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b, null);
    popularColor.textContent = popular
        ? `El color más popular es: ${popular}`
        : "No hay votos aún.";
}

function resetParty() {
    votes = { black: 0, red: 0, yellow: 0 }; 
    updateVoteList();
    updatePopularColor();
    title.style.color = "black"; 
    newColorSection.style.display = "none"; 
    toggleNewColorsButton.textContent = "Mostrar Colores Nuevos";
    popularColor.textContent = "No hay votos aún";
    document.getElementById("new-color-section").style.display = "none";
   
    resetTimer();


for (const sound in sounds) {
    sounds[sound].pause();
    sounds[sound].currentTime = 0; 
  }

}

function toggleNewColors() {
    if (newColorSection.style.display === "none") {
        newColorSection.style.display = "block";
        toggleNewColorsButton.textContent = "Esconder Colores Nuevos";
    } else {
        newColorSection.style.display = "none";
        toggleNewColorsButton.textContent = "Mostrar Colores Nuevos";
    }
}

function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(resetParty, timeoutDuration);
}

function playSound(color) {
    if (sounds[color]) {
        sounds[color].play().catch(error => {
            console.error("Error al intentar reproducir el sonido:", error); 
        });
    } else {
        console.log(`No hay sonido disponible para el color ${color}`); 
    }
}

function moveToDefaultPalette(colorElement) {
    const color = colorElement.dataset.color;

    document.getElementById("color-palette").appendChild(colorElement);

    colorElement.addEventListener("click", () => {
        changeTitleColor(color);
        incrementVote(color); 
    });

    if (!votes[color]) {
        votes[color] = 0; 
    }

    updateVoteList();
    updatePopularColor();
} 
    
document.querySelectorAll("#new-color-palette .color").forEach(colorElement => {
    colorElement.addEventListener("click", () => {
        moveToDefaultPalette(colorElement); 
        changeTitleColor(colorElement.dataset.color);
    });
});


colorButtons.forEach(button => {
    button.addEventListener("click", () => { 
        changeTitleColor(button.dataset.color);
     });

});

resetButton.addEventListener("click", resetParty);
toggleNewColorsButton.addEventListener("click", toggleNewColors);

resetTimer();