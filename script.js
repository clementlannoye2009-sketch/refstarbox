// ------- CONFIG ------

// tableau contenant les 70 sons
const sons = [];
for (let i = 1; i <= 70; i++) {
  sons[i] = new Audio(`son/cri${i}.mp3`);
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
    nomDebloque: `CRIS ${i}`,
    nomBloque: "🔒"
  });
}

// ------- FONCTIONS ------

const grid = document.getElementById("grid-cris");
const globalCounterDiv = document.getElementById("global-counter");
const img = document.getElementById("cry-image");

// FORCE le redémarrage du son à chaque clic
function playSound(id) {
  const audio = sons[id];
  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(() => {});
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

    div.onclick = () => {
      globalClicks++;
      updateGlobalCounter();

      const cible = nextToUnlock();
      const idSon = cible ? cible.id : cri.id;
      playSound(idSon);

      // déblocage automatique : chaque 100 clics
      cris.forEach(c => {
        const seuil = (c.id - 1) * 100;
        if (globalClicks >= seuil) c.unlocked = true;
      });

      render();
    };

    grid.appendChild(div);
  });
}

// clic sur l'image → joue le prochain son
img.addEventListener("click", () => {
  const cible = nextToUnlock();
  const idSon = cible ? cible.id : 1;
  playSound(idSon);
});

updateGlobalCounter();
render();
