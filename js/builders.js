
const DATA = {
  builder:{
    title:"👷‍♂️ Builder Villager",
    text:"Hi! I build strong, affordable homes. Safe housing protects families from storms and earthquakes and makes cities fair for everyone."
  },
  engineer:{
    title:"⚙️ Engineer Villager",
    text:"Hi! I’m the Engineer Villager. Want to see how solar panels and wind power keep our city clean and bright?"
  },
  librarian:{
    title:"📚 Librarian Villager",
    text:"Hello! I protect libraries, monuments, and old buildings so future generations remember our culture and history."
  },
  bee:{
    title:"🐝 City Bee",
    text:"Bzzz! Parks, trees, and flowers help me and my friends. Green spaces cool cities and keep nature alive."
  },
  golem:{
    title:"🛡️ Iron Golem",
    text:"I guard the community! Safe streets, strong buildings, and caring neighbors make cities resilient."
  },
  minecart:{
    title:"🚋 Minecart Worker",
    text:"All aboard! Trains, trams, bikes, and walking reduce traffic and pollution. Let’s move smart!"
  }
};

const bubble = document.getElementById('bubble');
const titleEl = document.getElementById('bubbleTitle');
const textEl = document.getElementById('bubbleText');

function openBubble(key){
  const d = DATA[key];
  if(!d) return;
  titleEl.textContent = d.title;
  textEl.textContent = d.text;
  bubble.hidden = false;
}
function closeBubble(){ bubble.hidden = true; }

bubble.addEventListener('click', e=>{ if(e.target===bubble) closeBubble(); });
bubble.querySelector('.close').addEventListener('click', closeBubble);

document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click', ()=> openBubble(card.dataset.builder));
});
