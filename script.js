const progress=document.querySelector('#progress');const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
reveals.forEach(e=>io.observe(e));
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/h*100)+'%';},{passive:true});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
const hero=document.querySelector('.hero-bg');addEventListener('pointermove',e=>{if(!hero)return;const x=(e.clientX/innerWidth-.5)*10,y=(e.clientY/innerHeight-.5)*10;hero.style.transform=`scale(1.04) translate(${x}px,${y}px)`},{passive:true});