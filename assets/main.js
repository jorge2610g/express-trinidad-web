const countdown = document.querySelector('#launch-countdown');

if (countdown) {
  const launchDate = new Date('2026-09-22T00:00:00Z').getTime();
  const fields = {
    days: document.querySelector('#countdown-days'),
    hours: document.querySelector('#countdown-hours'),
    minutes: document.querySelector('#countdown-minutes'),
    seconds: document.querySelector('#countdown-seconds'),
  };
  const message = document.querySelector('#countdown-message');

  const update = () => {
    const remaining = launchDate - Date.now();
    if (remaining <= 0) {
      countdown.classList.add('launched');
      message.textContent = '¡Express ya está en Trinidad!';
      return false;
    }

    fields.days.textContent = String(Math.floor(remaining / 86400000)).padStart(2, '0');
    fields.hours.textContent = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, '0');
    fields.minutes.textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
    fields.seconds.textContent = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
    return true;
  };

  update();
  const timer = setInterval(() => {
    if (!update()) clearInterval(timer);
  }, 1000);
}

const form = document.querySelector('#registro');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const text = `Hola, quiero registrarme como conductor para el lanzamiento de Express Trinidad.\n\nNombre: ${data.get('name')}\nCelular: ${data.get('phone')}\nVehículo: ${data.get('vehicle')}\nCorreo electrónico: ${data.get('email')}`;
    window.open(`https://api.whatsapp.com/send?phone=59168972863&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });
}

const header = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');

if (header && menuToggle) {
  const closeMenu = () => {
    header.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  };

  menuToggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '✕' : '☰';
  });

  document.querySelectorAll('.section-nav a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}
