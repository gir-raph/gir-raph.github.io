
const mapping = {"paper_cardboard": ["newspaper", "cardboard_box", "paper_sheet", "paper_bag", "notebook", "magazine", "envelope", "brochure", "pizza_box_clean", "toilet_paper_roll"], "glass": ["glass_bottle", "glass_jar", "olive_oil_bottle", "jam_jar", "sauce_glass", "broken_glass", "wine_bottle", "perfume_glass", "milk_glass", "pickle_jar"], "plastic": ["plastic_bottle", "yogurt_cup", "plastic_bag", "plastic_straw", "shampoo_bottle", "milk_carton_plastic", "plastic_wrap", "juice_plastic_bottle", "cleaning_bottle", "plastic_container"], "metal_cans": ["aluminum_can", "tin_can", "steel_fork", "metal_lid", "foil_sheet", "metal_cap", "soda_can_tab", "food_can", "metal_jar_lid", "aluminum_tray"], "organic": ["banana_peel", "apple_core", "vegetable_scraps", "egg_shells", "coffee_grounds", "tea_bag", "orange_peel", "bread_crust", "food_leftovers", "organic_waste_mix"], "general_waste": ["chip_bag", "fruit_sticker", "dirty_napkin", "plastic_cutlery", "broken_toy", "ceramic_piece", "candy_wrapper", "styrofoam_piece", "receipt", "used_tissue"]};
const allItems = ["newspaper", "cardboard_box", "paper_sheet", "paper_bag", "notebook", "magazine", "envelope", "brochure", "pizza_box_clean", "toilet_paper_roll", "glass_bottle", "glass_jar", "olive_oil_bottle", "jam_jar", "sauce_glass", "broken_glass", "wine_bottle", "perfume_glass", "milk_glass", "pickle_jar", "plastic_bottle", "yogurt_cup", "plastic_bag", "plastic_straw", "shampoo_bottle", "milk_carton_plastic", "plastic_wrap", "juice_plastic_bottle", "cleaning_bottle", "plastic_container", "aluminum_can", "tin_can", "steel_fork", "metal_lid", "foil_sheet", "metal_cap", "soda_can_tab", "food_can", "metal_jar_lid", "aluminum_tray", "banana_peel", "apple_core", "vegetable_scraps", "egg_shells", "coffee_grounds", "tea_bag", "orange_peel", "bread_crust", "food_leftovers", "organic_waste_mix", "chip_bag", "fruit_sticker", "dirty_napkin", "plastic_cutlery", "broken_toy", "ceramic_piece", "candy_wrapper", "styrofoam_piece", "receipt", "used_tissue"];

let items = [];
let shown = 0;
let score = 0;
const maxItems = 30;
const neededScore = 10;
let selected = false;

let sndCorrect = null;
let sndWrong = null;

const startBtn = document.getElementById('start-btn');
const currentItem = document.getElementById('current-item');
const statusBox = document.getElementById('status-box');
let scoreEl = document.getElementById('score');

startBtn.addEventListener('pointerdown', startGame);

function clearBinHighlights() {
  document.querySelectorAll('.bin').forEach(b => b.style.boxShadow = '');
}

function startGame() {
  // Reset UI
  statusBox.innerHTML = "Score: <span id='score'>0</span>";
  scoreEl = document.getElementById('score');

  score = 0;
  shown = 0;
  selected = false;

  clearBinHighlights();

  startBtn.style.display = 'none';
  currentItem.classList.remove('hidden');

  // Safari-safe silent audio unlock (no audible sound)
  sndCorrect = new Audio('assets/sound/correct.wav');
  sndWrong   = new Audio('assets/sound/wrong.wav');
  try {
    sndCorrect.volume = 0;
    sndCorrect.play().then(() => {
      sndCorrect.pause();
      sndCorrect.currentTime = 0;
      sndCorrect.volume = 1;
    });
  } catch(e){}

  items = [...allItems].sort(() => Math.random() - 0.5).slice(0, maxItems);
  loadItem();
}

function loadItem() {
  if (shown >= items.length) { endGame(false); return; }
  const name = items[shown++];
  currentItem.src = 'assets/objects/' + name + '.png';
  currentItem.dataset.type = findBin(name);
  currentItem.style.outline = 'none';
  selected = false;
}

function findBin(name) {
  for (const b in mapping) if (mapping[b].includes(name)) return b;
  return 'general_waste';
}

currentItem.addEventListener('pointerdown', () => {
  selected = true;
  currentItem.style.outline = '4px solid #22c55e';
});

Array.from(document.querySelectorAll('.bin')).forEach(bin => {
  bin.addEventListener('pointerdown', () => {
    if (!selected) return;

    clearBinHighlights();

    if (bin.dataset.type === currentItem.dataset.type) {
      score++;
      bin.style.boxShadow = '0 0 0 6px #22c55e';
      sndCorrect && sndCorrect.play();
    } else {
      score--;
      bin.style.boxShadow = '0 0 0 6px #dc2626';
      sndWrong && sndWrong.play();
    }

    scoreEl.textContent = score;
    if (score >= neededScore) { endGame(true); return; }
    setTimeout(loadItem, 300);
  });
});

function endGame(won) {
  clearBinHighlights();
  currentItem.classList.add('hidden');
  statusBox.textContent = won
    ? '🎉 AMAZING! You cleaned the city like a true eco‑hero!'
    : '💡 Game over! Ready to try again and beat the challenge?';
  startBtn.style.display = 'inline-block';
}
