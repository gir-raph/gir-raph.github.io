
let mapping = {"paper_cardboard": ["newspaper", "cardboard_box", "paper_sheet", "paper_bag", "notebook", "magazine", "envelope", "brochure", "pizza_box_clean", "toilet_paper_roll"], "glass": ["glass_bottle", "glass_jar", "olive_oil_bottle", "jam_jar", "sauce_glass", "broken_glass", "wine_bottle", "perfume_glass", "milk_glass", "pickle_jar"], "plastic": ["plastic_bottle", "yogurt_cup", "plastic_bag", "plastic_straw", "shampoo_bottle", "milk_carton_plastic", "plastic_wrap", "juice_plastic_bottle", "cleaning_bottle", "plastic_container"], "metal_cans": ["aluminum_can", "tin_can", "steel_fork", "metal_lid", "foil_sheet", "metal_cap", "soda_can_tab", "food_can", "metal_jar_lid", "aluminum_tray"], "organic": ["banana_peel", "apple_core", "vegetable_scraps", "egg_shells", "coffee_grounds", "tea_bag", "orange_peel", "bread_crust", "food_leftovers", "organic_waste_mix"], "general_waste": ["chip_bag", "fruit_sticker", "dirty_napkin", "plastic_cutlery", "broken_toy", "ceramic_piece", "candy_wrapper", "styrofoam_piece", "receipt", "used_tissue"]};
let allItems = ["newspaper", "cardboard_box", "paper_sheet", "paper_bag", "notebook", "magazine", "envelope", "brochure", "pizza_box_clean", "toilet_paper_roll", "glass_bottle", "glass_jar", "olive_oil_bottle", "jam_jar", "sauce_glass", "broken_glass", "wine_bottle", "perfume_glass", "milk_glass", "pickle_jar", "plastic_bottle", "yogurt_cup", "plastic_bag", "plastic_straw", "shampoo_bottle", "milk_carton_plastic", "plastic_wrap", "juice_plastic_bottle", "cleaning_bottle", "plastic_container", "aluminum_can", "tin_can", "steel_fork", "metal_lid", "foil_sheet", "metal_cap", "soda_can_tab", "food_can", "metal_jar_lid", "aluminum_tray", "banana_peel", "apple_core", "vegetable_scraps", "egg_shells", "coffee_grounds", "tea_bag", "orange_peel", "bread_crust", "food_leftovers", "organic_waste_mix", "chip_bag", "fruit_sticker", "dirty_napkin", "plastic_cutlery", "broken_toy", "ceramic_piece", "candy_wrapper", "styrofoam_piece", "receipt", "used_tissue"];
let items=[]; let shown=0; let score=0;
const maxItems=30, neededScore=10;
const startBtn=document.getElementById('start-btn');
const currentItem=document.getElementById('current-item');
const statusBox=document.getElementById('status-box');
let scoreEl=document.getElementById('score');

startBtn.onclick=startGame;
function startGame(){
 statusBox.innerHTML="Score: <span id='score'>0</span>";
 scoreEl=document.getElementById('score');
 startBtn.style.display='none';
 currentItem.classList.remove('hidden');
 score=0; shown=0;
 items=[...allItems].sort(()=>Math.random()-0.5).slice(0,maxItems);
 loadItem();}

function loadItem(){
 if(shown>=items.length){ endGame(false); return; }
 let name=items[shown]; shown++;
 currentItem.src='assets/objects/'+name+'.png';
 currentItem.dataset.type=findBin(name);}

function findBin(name){
 for(let bin in mapping){ if(mapping[bin].includes(name)) return bin; }
 return 'general_waste';}

currentItem.ondragstart=e=>{e.dataTransfer.setData('type', currentItem.dataset.type);};

document.querySelectorAll('.bin').forEach(bin=>{
 bin.ondragover=e=>e.preventDefault();
 bin.ondrop=e=>{
  let correct=e.dataTransfer.getData('type');
  if(correct===bin.dataset.type){ score++; }
  else{ score--; bin.style.border='5px solid red'; setTimeout(()=>bin.style.border='3px solid #334155',300); }
  scoreEl.textContent=score;
  if(score>=neededScore){ endGame(true); return; }
  loadItem();};});

function endGame(won){
 currentItem.classList.add('hidden');
 statusBox.textContent = won? '🎉 AMAZING! You cleaned the city like a true eco‑hero!' : '💡 Game over! Ready to try again and beat the challenge?';
 startBtn.style.display='inline-block'; score=0;}
