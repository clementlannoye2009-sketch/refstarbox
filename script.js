// ------- CONFIG ------

// un seul son
const sons = {
  1: new Audio("son/cri1.mp3")
};
sons[1].preload = "auto";

// couleurs alternées
const couleurs = ["#ff3b30", "#007aff", "#ffcc00", "#34c759"];

// stockage de la seule case
let cris = [{
  id: 1,
  unlocked: true,
  compteur: 0,
  nomDebloque: "CRIS 1"
}];

// ------- FONCTIONS ------

const grid = document.getElementById("grid-cris");
const img = document.getElementById("cry-image");

// lecture du seul son existant
function playSound() {
  const audio = sons[1];
  audio.currentTime = 0;
  audio.play().catch(e => console.warn("Erreur audio :", e));
}

function render() {
  grid.innerHTML = "";

  cris.forEach((cri, index) => {
    const div = document.createElement("div");
    div.className = "case";
    div.style.background = couleurs[index % couleurs.length];
    div.textContent = cri.nomDebloque;

    div.onclick = () => {
      playSound();
    };

    grid.appendChild(div);
  });
}

// clic sur l’image → joue le cri1
img.addEventListener("click", playSound);

// lancer l’affichage
render();
