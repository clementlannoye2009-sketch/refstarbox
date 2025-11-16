// ------- CONFIG ------

// tableau contenant les 70 sons
const sons = [];
for (let i = 1; i <= 70; i++) {
  sons[i] = new Audio(`sons/cri${i}.mp3`);
  sons[i].preload = "auto";
}

// couleurs alternées
const couleurs = ["#ff3b30", "#007aff", "#ffcc00", "#34c759", "#ff2d55", "#ff9500", "#af52de", "#5ac8fa"];

// stockage des cases
let cris = [];
let globalClicks = 0;

for (let i = 1; i <= 70; i++) {
  cris.push({
    id: i,
    unlocked: i === 1,
    compteur: 0,
    nomDebloque: `CRIS ${i}`,
    nomBloque: "🔒"
  });
}

// ------- FONCTIONS ------

const grid = document.getElementById("grid-cris");
const globalCounterDiv = document.getElementById("global-counter");
const img = document.getElementById("cry-image");

// son qui relance à chaque clic
function playSound(id) {
  try {
    const audio = sons[id];
    audio.currentTime = 0;
    audio.play().catch(e => console.warn("Erreur audio :", e));
  } catch (e) {
    console.error("Impossible de jouer le son", e);
  }
}

function nextToUnlock() {
  return cris.find(c => !c.unlocked);
}

function updateGlobalCounter() {
  globalCounterDiv.textContent = `${globalClicks} cris`;
}

function render() {
  grid.innerHTML = "";

  const next = nextToUnlock();

  cris.forEach((cri, index) => {
    const div = document.createElement("div");
    div.className = "case";
    div.style.background = couleurs[index % couleurs.length];

    if (!cri.unlocked) {
      div.classList.add("locked");
      div.innerHTML = cri.nomBloque;
    } else {
      div.innerHTML = cri.nomDebloque;
    }

    if (next && cri.id === next.id) {
      div.classList.add("unlocking");
    }

    div.onclick = () => {
      globalClicks++;
      updateGlobalCounter();

      // son : prend le prochain à débloquer
      const cible = nextToUnlock();
      const idSon = cible ? cible.id : cri.id;
      playSound(idSon);

      // incrémente le compteur du prochain
      if (cible) cible.compteur++;

      // déblocage automatique tous les 100 clics
      cris.forEach(c => {
        const seuil = (c.id - 1) * 100;
        if (globalClicks >= seuil) c.unlocked = true;
      });

      render();
    };

    grid.appendChild(div);
  });
}

// clic sur l'image → joue le son du prochain
img.addEventListener("click", () => {
  const cible = nextToUnlock();
  const idSon = cible ? cible.id : 1;
  playSound(idSon);
});

updateGlobalCounter();
render();
