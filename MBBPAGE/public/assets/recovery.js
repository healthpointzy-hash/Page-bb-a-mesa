const HOTMART_CHECKOUT_URL = 'https://pay.hotmart.com/N108315003S';
const offer = document.getElementById('oferta');
for (const button of document.querySelectorAll('button')) {
  const label = button.textContent.trim();
  if (label.startsWith('QUERO ') && !button.closest('#oferta')) {
    button.addEventListener('click', () => offer?.scrollIntoView({ behavior: 'smooth' }));
  }
}
document.querySelector('[data-checkout]')?.setAttribute('href', HOTMART_CHECKOUT_URL);
for (const button of document.querySelectorAll('button[aria-expanded]')) {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    const panel = button.nextElementSibling;
    if (panel) {
      panel.style.display = open ? 'none' : '';
      panel.classList.toggle('grid-rows-[1fr]', !open);
      panel.classList.toggle('opacity-100', !open);
    }
    button.querySelector('.lucide-chevron-down')?.classList.toggle('rotate-180', !open);
  });
}
const video = document.querySelector('video[aria-label]');
const play = [...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label')?.includes('Reproduzir apresentação'));
play?.addEventListener('click', () => { video?.play(); play.style.display = 'none'; });
const socialTrack = document.querySelector('.social-track');
if (socialTrack) {
  const slides = [...socialTrack.querySelectorAll('.social-slide')];
  const dots = document.querySelector('.social-dots');
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button'; dot.setAttribute('aria-label', `Ver conversa ${i+1}`);
    dot.addEventListener('click', () => slides[i].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'}));
    dots.append(dot);
  });
  const update = () => {
    const center = socialTrack.scrollLeft + socialTrack.clientWidth / 2;
    let nearest = 0, distance = Infinity;
    slides.forEach((slide, i) => { const d = Math.abs(slide.offsetLeft - socialTrack.offsetLeft + slide.clientWidth/2 - center); if (d < distance) { distance=d; nearest=i; } });
    [...dots.children].forEach((dot,i)=>dot.setAttribute('aria-current',String(i===nearest)));
  };
  socialTrack.addEventListener('scroll',update,{passive:true});
  document.querySelectorAll('.social-arrow').forEach(button=>button.addEventListener('click',()=>{
    const step = slides[0].getBoundingClientRect().width + 18;
    socialTrack.scrollBy({left:Number(button.dataset.dir)*step,behavior:'smooth'});
  }));
  update();
}
for (const link of document.querySelectorAll('a[href="#"]')) {
  link.removeAttribute('href');
  link.setAttribute('aria-disabled', 'true');
}
