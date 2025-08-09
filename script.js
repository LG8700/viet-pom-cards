let words=[], idx=0, flipped=false;

const card=document.getElementById('card');
const front=card.querySelector('.front');
const back=card.querySelector('.back');
const viEl=card.querySelector('.vi');
const enEl=card.querySelector('.en');
const exEl=card.querySelector('.ex');
const progress=document.getElementById('progress');
const prevBtn=document.getElementById('prevBtn');
const nextBtn=document.getElementById('nextBtn');
const shuffleBtn=document.getElementById('shuffleBtn');

// Use a single photo in the root folder
const bgs = ["IMG_4291.jpeg"];

fetch('words.json').then(r=>r.json()).then(d=>{ words=d; shuffleDeck(); render(); });

function render(){
  const w=words[idx];
  const bg=bgs[0];
  front.style.backgroundImage=`url(${bg})`;
  back.style.backgroundImage=`url(${bg})`;
  viEl.textContent=w.vi;
  enEl.textContent=w.en;
  exEl.textContent=w.ex;
  progress.textContent=`${idx+1} / ${words.length}`;
  setFlipped(false);
}
function setFlipped(v){ flipped=v; card.classList.toggle('flipped', flipped); }
function next(){ idx=(idx+1)%words.length; render(); }
function prev(){ idx=(idx-1+words.length)%words.length; render(); }
function shuffleDeck(){
  for(let i=words.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [words[i],words[j]]=[words[j],words[i]]; }
  idx=0;
}

card.addEventListener('click', ()=> setFlipped(!flipped));

let startX=null,startY=null,t0=0;
card.addEventListener('touchstart', e=>{const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY;t0=Date.now();},{passive:true});
card.addEventListener('touchend', e=>{
  const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY,dt=Date.now()-t0;
  if(Math.abs(dx)>50 && Math.abs(dy)<60 && dt<600){ dx<0?next():prev(); } else { setFlipped(!flipped); }
},{passive:true});

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
shuffleBtn.addEventListener('click', ()=>{shuffleDeck(); render();});

