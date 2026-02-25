
const DATA={
 architect:{title:"Architect Villager",text:"I design strong, safe, affordable homes that protect families from storms and heat. Everyone deserves a safe place to live!"},
 solarEngineer:{title:"Solar Engineer Villager",text:"I cover rooftops with solar panels so our city runs on clean, renewable energy. Let’s make our future shine!"},
 urbanGardener:{title:"Urban Gardener Villager",text:"I plant rooftop gardens, balcony plants, and park trees! Green places make cities cooler, cleaner, and full of life."},
 heritageKeeper:{title:"Heritage Keeper Librarian",text:"Old buildings tell amazing stories! I restore monuments so our culture stays alive for generations."},
 trafficPlanner:{title:"Traffic Planner Villager",text:"Bikes, buses, and trains are my specialty! Smart transport reduces pollution and keeps streets safe."},
 golemMarshal:{title:"Iron Golem Marshal",text:"I defend neighborhoods, parks, and schools. Strong communities keep everyone safe!"},
 rainCollector:{title:"Rain Collector Villager",text:"Rainwater is precious! I collect and clean it to help gardens grow and to prepare for emergencies."},
 recyclerSlime:{title:"Recycling Slime",text:"Squeeeesh! I sort waste into recycling bins for plastic, paper, metal, and compost. A cleaner city starts with us!"},
 disasterScientist:{title:"Disaster Scientist",text:"Earthquakes? Floods? Heat waves? I build early‑warning systems so the whole city stays safe during disasters."},
 beeQueen:{title:"Bee Queen",text:"Buzz buzz! I keep plants healthy by spreading pollen. More flowers and trees mean a happier, greener city!"}
};

const bubble=document.getElementById('bubble');
const titleEl=document.getElementById('bubbleTitle');
const textEl=document.getElementById('bubbleText');
function openBubble(key){const d=DATA[key];if(!d)return;titleEl.textContent=d.title;textEl.textContent=d.text;bubble.hidden=false;}
function closeBubble(){bubble.hidden=true;}
bubble.addEventListener('click',e=>{if(e.target===bubble)closeBubble();});
bubble.querySelector('.close').addEventListener('click',closeBubble);
document.querySelectorAll('.card').forEach(card=>{card.addEventListener('click',()=>openBubble(card.dataset.builder));});
