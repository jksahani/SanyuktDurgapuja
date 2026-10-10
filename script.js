const $=s=>document.querySelector(s);

const SCHEDULE=[
["10 October",[["Akhand Jyot / Akhand Jyoti Prakash","10:00 AM"]]],
["11 October",[["Special Akhand Jyot-related program","See official poster"]]],
["12 October",[["Brahmacharini Devi Puja","9:00 AM"]]],
["13 October",[["Chandraghanta Devi Puja","9:00 AM"]]],
["14 October",[["Kushmanda Devi Puja","9:00 AM"]]],
["15 October",[["Skandamata Puja","7:40 AM"]]],
["16 October",[["Katyayani / Gaj Puja / Bilva Nimantran","5:00 PM"]]],
["17 October",[["Maa Durga Pratima Ka Mukhavaran / Cultural Program","See official poster"]]],
["18 October",[["Ashtami Puja","9:00 AM"]]],
["19 October",[["Havan / Kanya Pujan","2:00 PM"],["Dandiya Night","6:00 PM – 10:00 PM"]]],
["20 October",[["Aparajita Pujan / Kanjak Darshan / Bhandara","8:00 AM – 12:00 PM"]]],
["21 October",[["Visarjan (with DJ / procession)","2:00 PM"]]]
];

const EVENTS=[
["🪔","Akhand Jyot"],["🙏","Navratri Puja"],["🌺","Maa Durga Darshan"],["🎶","Bhajan Sandhya"],
["🎭","Cultural Programs"],["💃","Dandiya Night"],["🍚","Bhandara"],["🌸","Sindoor Khela"],["🚩","Visarjan"]
];

const CONTACTS=[
["Abhishek Singh","9015281049"],["Akshay Kumar","9999072234"],["Sudhir Sinha","9999770839"],["Pankaj Choudhary","7011201649"],
["Ram Sahai Rai","9717325339"],["Pankaj Kumar Jha","7838331121"],["Dilip Kumar Jha","9711453102"],["Yashpal Bhandari","9873140269"],
["Vishal Mehta","9971927192"],["Punit Singh","8010655661"],["Ritesh Singh","7044515901"],["Suresh Maurya","9350796606"],
["Rajarshi Kumar","9711201484"],["Deepak Singh","8447235316"],["Navneet Juneja","9560730033"],["Harsh Gupta","8860838566"],
["P C Patel","9559267783"],["Amit Singh","7619609710"],["Ujjwal Dubey","9810623607"],["Manoj Kumar","9354482331"]
];

const GALLERY=[
{src:"assets/Dandiya.jpeg",alt:"Dandiya night celebration during Durga Puja"},
{src:"assets/Durga-pandal.jpeg",alt:"Maa Durga pandal view during the festival"},
{src:"assets/Ramayan-Path.jpeg",alt:"Ramayan path festival event during Navratri"},
{src:"assets/Jyot-01.jpeg",alt:"Festival jyot photo 1"},
{src:"assets/Jyot-02.jpeg",alt:"Festival jyot photo 2"},
{src:"assets/Jyot-03.jpeg",alt:"Festival jyot photo 3"},
{src:"assets/Jyot-04.jpeg",alt:"Festival jyot photo 4"}
];

$('#timeline').innerHTML=SCHEDULE.map(([d,e])=>`<article class="tl rv"><div class="dt">${d}</div><ul>${e.map(([n,t])=>`<li><h3>${n}</h3><span class="tm">${t}</span></li>`).join('')}</ul></article>`).join('');
$('#evgrid').innerHTML=EVENTS.map(([i,n])=>`<div class="rv"><em>${i}</em>${n}</div>`).join('');
$('#ct').innerHTML=CONTACTS.map(([n,p])=>`<a class="rv" href="tel:+91${p}"><b>${n}</b><span>📞 +91-${p}</span></a>`).join('');

const menu=$('#menu'),bg=$('#burger');
bg.onclick=()=>{const o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
menu.onclick=e=>{if(e.target.tagName==='A'){menu.classList.remove('open');bg.setAttribute('aria-expanded',false)}};

const target=new Date('2026-10-10T10:00:00+05:30');
function tick(){
 const diff=target-new Date();
 if(diff<=0){$('#cd-title').textContent='Jai Mata Di — Celebrations Have Begun!';$('#cd').hidden=true;return}
 const p=n=>String(n).padStart(2,'0');
 $('#d').textContent=p(Math.floor(diff/864e5));
 $('#h').textContent=p(Math.floor(diff/36e5)%24);
 $('#m').textContent=p(Math.floor(diff/6e4)%60);
 $('#s').textContent=p(Math.floor(diff/1e3)%60)
}
tick();setInterval(tick,1000);

const lb=$('#lb'),img=$('#lbimg');let list=[],idx=0;
function show(){img.src=list[idx].src;img.alt=list[idx].alt;lb.classList.toggle('single',list.length<2)}
function openLightbox(l,i){list=l;idx=i;show();lb.hidden=false;$('#lbx').focus()}
const close=()=>{lb.hidden=true},step=d=>{idx=(idx+d+list.length)%list.length;show()};
$('#lbx').onclick=close;$('#lbp').onclick=()=>step(-1);$('#lbn').onclick=()=>step(1);
lb.onclick=e=>{if(e.target===lb)close()};
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
let sx=0;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50&&list.length>1)step(dx<0?1:-1)});

const QR=[{src:'assets/qr-donation.jpg',alt:'Donation QR code for Sanyukt Durga Puja Trust'}];
$('#qrOpen').onclick=$('#qrOpen2').onclick=()=>openLightbox(QR,0);

$('#gal').innerHTML=GALLERY.map((g,i)=>`<button data-i="${i}" aria-label="Open photo ${i+1}"><img loading="lazy" src="${g.src}" alt="${g.alt}"></button>`).join('');
$('#gal').onclick=e=>{const b=e.target.closest('button');if(b)openLightbox(GALLERY,+b.dataset.i)};

const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

(function(){
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 const c=$('#sparks'),x=c.getContext('2d');let w,h,ps=[];
 const fit=()=>{w=c.width=c.offsetWidth;h=c.height=c.offsetHeight;ps=Array.from({length:Math.min(65,w/18|0)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+.6,v:Math.random()*.5+.2,a:Math.random()}))};
 fit();addEventListener('resize',fit);
 (function f(){x.clearRect(0,0,w,h);ps.forEach(p=>{p.y-=p.v;p.a+=.02;if(p.y<-5){p.y=h+5;p.x=Math.random()*w}
 x.fillStyle=`rgba(255,200,80,${.25+.35*Math.sin(p.a)})`;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});requestAnimationFrame(f)})()
})();
