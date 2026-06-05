
const energyType = {"solar": "Renewable", "wind": "Renewable", "hydro": "Renewable", "geothermal": "Renewable", "biomass": "Renewable", "tidal": "Renewable", "wave": "Renewable", "green_hydrogen": "Renewable", "solar_thermal": "Renewable", "small_hydropower": "Renewable", "coal": "Non-renewable", "oil": "Non-renewable", "diesel": "Non-renewable", "petrol": "Non-renewable", "natural_gas": "Non-renewable", "lpg": "Non-renewable", "peat": "Non-renewable", "tar_sands": "Non-renewable", "shale_gas": "Non-renewable", "uranium_nuclear": "Non-renewable"};
const allEnergies = ["solar", "wind", "hydro", "geothermal", "biomass", "tidal", "wave", "green_hydrogen", "solar_thermal", "small_hydropower", "coal", "oil", "diesel", "petrol", "natural_gas", "lpg", "peat", "tar_sands", "shale_gas", "uranium_nuclear"];

let queue = [];
let shown = 0;
let score = 0;
const targetScore = 5;
let selected = false;

const startBtn = document.getElementById('start-btn');
const currentEnergy = document.getElementById('current-energy');
const energyLabel = document.getElementById('energy-label');
const statusBox = document.getElementById('status-box');
const boxes = Array.from(document.querySelectorAll('.choice-box'));

startBtn.addEventListener('pointerdown', startGame);

function resetBoxHighlights() {
  boxes.forEach(b => b.style.boxShadow = '0 4px 12px rgba(0,0,0,.14)');
}

function startGame() {
  score = 0;
  shown = 0;
  selected = false;
  resetBoxHighlights();
  statusBox.innerHTML = 'Score: <span id="score">0</span> / 5';
  startBtn.style.display = 'none';
  currentEnergy.classList.remove('hidden');
  energyLabel.classList.remove('hidden');
  energyLabel.textContent = '';
  queue = [...allEnergies].sort(() => Math.random() - 0.5);
  loadEnergy();
}

function loadEnergy() {
  if (queue.length === 0) {
    queue = [...allEnergies].sort(() => Math.random() - 0.5);
  }
  const name = queue.pop();
  currentEnergy.src = 'assets/energies/' + name + '.png';
  currentEnergy.dataset.type = energyType[name];
  currentEnergy.dataset.name = name;
  energyLabel.textContent = titleCase(name.replaceAll('_', ' '));
  currentEnergy.style.outline = 'none';
  selected = false;
  shown++;
}

function titleCase(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

currentEnergy.addEventListener('pointerdown', () => {
  selected = true;
  currentEnergy.style.outline = '5px solid #22c55e';
});

boxes.forEach(box => {
  box.addEventListener('pointerdown', () => {
    if (!selected) return;
    resetBoxHighlights();
    if (box.dataset.type === currentEnergy.dataset.type) {
      score++;
      box.style.boxShadow = '0 0 0 7px #22c55e';
    } else {
      score--;
      box.style.boxShadow = '0 0 0 7px #dc2626';
    }
    document.getElementById('score').textContent = score;
    if (score >= targetScore) {
      endGame(true);
      return;
    }
    setTimeout(loadEnergy, 260);
  });
});

function endGame(won) {
  currentEnergy.classList.add('hidden');
  energyLabel.classList.add('hidden');
  energyLabel.textContent = '';
  resetBoxHighlights();
  statusBox.textContent = won
    ? '⚡ You powered the future like an Energy Hero!'
    : 'Game over! Tap Start to try the energy challenge again.';
  startBtn.style.display = 'inline-block';
}
