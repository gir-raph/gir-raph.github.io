
// main.js — for interactions (map popups, mini‑games coming soon)
console.log("SDG 11 site loaded!");

// Data for zones — short, kid-friendly SDG 11 learning
const ZONE_INFO = {
  "Park": {
    title: "🌳 Park — Green Spaces",
    text: "Parks cool cities, clean the air, and give people places to play. Plant more trees to reduce heat and improve health!",
    action: "Plant 3 trees on empty tiles (coming soon)"
  },
  "Housing": {
    title: "🏠 Housing — Safe & Affordable",
    text: "Everyone should have a safe home. Use strong materials in earthquake zones and make homes efficient to save energy.",
    action: "Pick the safest materials (coming soon)"
  },
  "Transit": {
    title: "🚈 Transit — Move Cleanly",
    text: "Trains, buses, bikes, and walking paths reduce traffic and pollution. More options = cleaner air.",
    action: "Build a bike lane (coming soon)"
  },
  "Energy": {
    title: "⚡ Energy — Clean Power",
    text: "Solar roofs and wind power reduce emissions. Smart grids make power reliable and green.",
    action: "Place solar panels (coming soon)"
  },
  "Heritage": {
    title: "🏛️ Heritage — Protect Culture",
    text: "Old buildings and special places tell our story. Restore them to keep history alive and boost tourism.",
    action: "Restore a landmark (coming soon)"
  },
  "Safety": {
    title: "🛡️ Safety — Resilient Cities",
    text: "Plan for floods, heat, and earthquakes. Strong buildings and good emergency plans save lives.",
    action: "Strengthen a building (coming soon)"
  },
  "Community": {
    title: "🛍️ Community — Inclusive Places",
    text: "Lively streets and markets help neighbors meet, trade, and feel welcome.",
    action: "Add a community garden (coming soon)"
  }
};

function setupMapPage(){
  const modal = document.getElementById('zoneModal');
  if(!modal) return; // we're not on city.html

  const titleEl = document.getElementById('modalTitle');
  const textEl  = document.getElementById('modalText');
  const actionBtn = document.getElementById('miniAction');
  const closeBtn = modal.querySelector('.close');

  function openModal(zoneKey){
    const info = ZONE_INFO[zoneKey] || {
      title: "City Zone",
      text: "Explore how this area can help make cities sustainable.",
      action: "Try a mini‑game (coming soon)"
    };
    titleEl.textContent = info.title;
    textEl.textContent = info.text;
    actionBtn.textContent = info.action;
    modal.hidden = false;
    // Accessibility: focus the close button
    closeBtn.focus();
  }
  function closeModal(){
    modal.hidden = true;
  }

  // Close with X or background click or Escape
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !modal.hidden) closeModal(); });

  // Attach click handlers to tiles with data-zone
  document.querySelectorAll('.tile[data-zone]').forEach(tile=>{
    tile.addEventListener('click', ()=>{
      const zone = tile.getAttribute('data-zone');
      openModal(zone);
    });
  });
}

document.addEventListener('DOMContentLoaded', setupMapPage);


// ------------------------------
// Mini-Game 1: Clean the Air
// Plant 3 trees on eligible tiles to earn a badge.
// ------------------------------
(function(){
  const GAME_KEY = 'cleanAirBadge';
  const GOAL = 3;
  let gameActive = false;
  let planted = 0;
  let mapGrid, hud, scoreEl, resetBtn;

  function createHUD(){
    if(hud) return hud;
    const cityMapSection = document.querySelector('.city-map');
    if(!cityMapSection) return null;

    hud = document.createElement('div');
    hud.className = 'hud';

    // Score chip (ARIA live for screen readers)
    scoreEl = document.createElement('div');
    scoreEl.className = 'chip';
    scoreEl.setAttribute('aria-live', 'polite');

    const helpEl = document.createElement('div');
    helpEl.className = 'chip';
    helpEl.textContent = 'Mini‑game: Click highlighted tiles to plant trees 🌳';

    resetBtn = document.createElement('button');
    resetBtn.className = 'btn';
    resetBtn.type = 'button';
    resetBtn.textContent = 'Reset trees';
    resetBtn.addEventListener('click', resetGame);

    hud.appendChild(scoreEl);
    hud.appendChild(helpEl);
    hud.appendChild(resetBtn);

    cityMapSection.prepend(hud);
    updateHUD();
    return hud;
  }

  function updateHUD(){
    if(!scoreEl) return;
    const badge = localStorage.getItem(GAME_KEY) === 'true';
    if(badge){
      scoreEl.textContent = '✅ Clean the Air badge earned!';
      return;
    }
    scoreEl.textContent = `Air Score: ${planted}/${GOAL}`;
  }

  function eligible(tile){
    // Avoid planting on water/transit/energy/safety tiles; allow others
    if(!tile || !tile.classList) return false;
    if(tile.dataset.planted === '1') return false;
    const forbidden = ['water','transit','energy','safety'];
    return !forbidden.some(cls=> tile.classList.contains(cls));
  }

  function highlightEligible(active){
    document.querySelector('.map-grid')?.classList.toggle('plant-mode', !!active);
    document.querySelectorAll('.map-grid .tile').forEach(t=>{
      if(active && eligible(t)){
        t.classList.add('plantable');
        t.title = 'Click to plant a tree';
      } else {
        t.classList.remove('plantable');
        if(t.title === 'Click to plant a tree') t.removeAttribute('title');
      }
    });
  }

  function startGame(){
    // If badge already earned, just show message
    if(localStorage.getItem(GAME_KEY) === 'true'){
      openWinModal();
      return;
    }
    createHUD();
    gameActive = true;
    highlightEligible(true);
    updateHUD();
  }

  function stopGame(){
    gameActive = false;
    highlightEligible(false);
  }

  function resetGame(){
    planted = 0;
    document.querySelectorAll('.map-grid .tile[data-planted="1"], .map-grid .tile .tree').forEach(el=>{
      if(el.classList && el.classList.contains('tree')){
        el.remove();
      } else if(el instanceof HTMLElement) {
        el.removeAttribute('data-planted');
      }
    });
    localStorage.removeItem(GAME_KEY);
    stopGame();
    updateHUD();
  }

  function plantOn(tile){
    if(!gameActive) return;
    if(!eligible(tile)) return;

    tile.dataset.planted = '1';
    const tree = document.createElement('span');
    tree.className = 'tree';
    tree.textContent = '🌳';
    tile.appendChild(tree);
    planted += 1;
    updateHUD();

    if(planted >= GOAL){
      localStorage.setItem(GAME_KEY, 'true');
      stopGame();
      openWinModal();
    }
  }

  function openWinModal(){
    const modal = document.getElementById('zoneModal');
    const titleEl = document.getElementById('modalTitle');
    const textEl  = document.getElementById('modalText');
    const action  = document.getElementById('miniAction');
    if(!modal || !titleEl || !textEl || !action) return;
    titleEl.textContent = '🎉 Clean the Air — Badge Unlocked!';
    textEl.textContent  = 'Great job! Planting trees helps cool cities and clean the air. You earned the Clean the Air badge.';
    action.textContent  = 'Play again (reset)';
    action.onclick = function(){ resetGame(); modal.hidden = true; };
    modal.hidden = false;
    modal.querySelector('.close')?.focus();
  }

  function wireUp(){
    mapGrid = document.querySelector('.map-grid');
    if(!mapGrid) return;

    // Capture clicks on tiles when in plant mode to prevent other handlers
    mapGrid.addEventListener('click', (e)=>{
      const tile = e.target.closest('.tile');
      if(!tile) return;
      if(gameActive){
        e.preventDefault();
        e.stopPropagation();
        plantOn(tile);
      }
    }, true);

    // Start the minigame when user presses the modal action button
    const actionBtn = document.getElementById('miniAction');
    if(actionBtn){
      actionBtn.addEventListener('click', ()=>{
        // Close the modal if visible
        const modal = document.getElementById('zoneModal');
        if(modal && !modal.hidden){ modal.hidden = true; }
        startGame();
      });
    }

    // If badge already earned, show it in HUD immediately
    if(localStorage.getItem(GAME_KEY) === 'true'){
      createHUD();
      updateHUD();
    }
  }

  document.addEventListener('DOMContentLoaded', wireUp);
})();
