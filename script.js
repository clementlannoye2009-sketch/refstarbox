// ------- CONFIG ------

// un seul son
const son = new Audio("son/cri1.mp3");
son.preload = "auto";

// ------- FONCTIONS ------

const grid = document.getElementById("grid-cris");
const globalCounterDiv = document.getElementById("global-counter");
const img = document.getElementById("cry-image");

// relancer le son à chaque clic
function playSound() {
  try {
    son.currentTime = 0;
    son.play().catch(e => console.warn("Erreur audio :", e));
  } catch (e) {
    console.error("Impossible de jouer le son", e);
  }
}

// clic sur l’image
img.addEventListener("click", () => {
  playSound();
});
