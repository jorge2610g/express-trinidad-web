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

const launchCapacity = document.querySelector('#launch-capacity');
if (launchCapacity) {
  const totalCapacity = 100;
  const startingProjection = 5;
  const projectedPerDay = 5;
  const projectionStart = new Date('2026-09-15T04:00:00Z').getTime();
  const launchDate = new Date('2026-09-22T00:00:00Z').getTime();
  const effectiveDate = Math.min(Date.now(), launchDate);
  const elapsedDays = Math.max(0, Math.floor((effectiveDate - projectionStart) / 86400000));
  const projectedRegistered = Math.min(totalCapacity, startingProjection + (elapsedDays * projectedPerDay));
  const projectedRemaining = Math.max(0, totalCapacity - projectedRegistered);

  document.querySelector('#projected-registered').textContent = String(projectedRegistered);
  document.querySelector('#projected-remaining').textContent = String(projectedRemaining);
  document.querySelector('#capacity-fill').style.width = `${projectedRegistered}%`;

  if (projectedRemaining === 0) {
    launchCapacity.classList.add('is-full');
    launchCapacity.querySelector('small').textContent = Date.now() >= launchDate
      ? 'El lanzamiento ya comenzó'
      : 'Cupos estimados completos para el lanzamiento';
  }
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

const serviceData = {
  moto: {
    icon: '🏍️',
    kicker: 'LA OPCIÓN MÁS ÁGIL',
    title: 'Express Moto',
    description: 'Ideal para moverte rápidamente por Trinidad y encontrar conductores cercanos.',
    price: 'Desde Bs 5',
    availability: 'Según conductores cercanos',
    action: 'Quiero conducir en moto',
  },
  auto: {
    icon: '🚗',
    kicker: 'MÁS ESPACIO Y COMODIDAD',
    title: 'Express Auto',
    description: 'Una alternativa cómoda para viajes diarios, grupos pequeños o cuando necesitas más espacio.',
    price: 'Precio negociable',
    availability: 'Según autos conectados',
    action: 'Quiero conducir mi auto',
  },
  mujer: {
    icon: '👩‍✈️',
    kicker: 'SEGURIDAD Y TRANQUILIDAD',
    title: 'Express Mujeres',
    description: 'Una pasajera podrá solicitar una conductora mujer verificada cuando esta modalidad esté disponible.',
    price: 'Visible antes de aceptar',
    availability: 'Según conductoras cercanas',
    action: 'Quiero registrarme como conductora',
  },
};

const serviceTabs = document.querySelectorAll('.service-tab');
if (serviceTabs.length) {
  let serviceTimer;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showService = (tab) => {
    const selected = serviceData[tab.dataset.service];
    if (!selected) return;
    serviceTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    const showcase = document.querySelector('#service-showcase');
    showcase.classList.remove('switching');
    void showcase.offsetWidth;
    showcase.classList.add('switching');
    document.querySelector('#service-icon').textContent = selected.icon;
    document.querySelector('#service-kicker').textContent = selected.kicker;
    document.querySelector('#service-title').textContent = selected.title;
    document.querySelector('#service-description').textContent = selected.description;
    document.querySelector('#service-price').textContent = selected.price;
    document.querySelector('#service-availability').textContent = selected.availability;
    document.querySelector('#service-action').textContent = selected.action;
  };

  const startServiceRotation = () => {
    if (reduceMotion) return;
    clearInterval(serviceTimer);
    serviceTimer = setInterval(() => {
      const current = [...serviceTabs].findIndex((tab) => tab.classList.contains('active'));
      showService(serviceTabs[(current + 1) % serviceTabs.length]);
    }, 6000);
  };

  serviceTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      showService(tab);
      startServiceRotation();
    });
  });
  startServiceRotation();
}

const dailyIncome = document.querySelector('#daily-income');
if (dailyIncome) {
  const formatBs = (value) => `Bs ${Number(value).toLocaleString('es-BO')}`;
  const updateIncome = () => {
    const daily = Number(dailyIncome.value);
    document.querySelector('#daily-income-label').textContent = formatBs(daily);
    document.querySelector('#income-day').textContent = formatBs(daily);
    document.querySelector('#income-week').textContent = formatBs(daily * 6);
    document.querySelector('#income-month').textContent = formatBs(daily * 26);
  };
  dailyIncome.addEventListener('input', updateIncome);
  updateIncome();
}

const revealTargets = document.querySelectorAll('main > section:not(.hero):not(.proof-strip)');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((section) => section.classList.add('motion-reveal'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((section) => revealObserver.observe(section));
}

const zones = [
  'Mercado Campesino',
  'Pompeya',
  'Paitití',
  '13 de Abril',
  'Centro',
  'Arroyo Chico',
];
const zoneMap = document.querySelector('#zone-map');
const zoneChips = document.querySelectorAll('.zone-chip');
const zoneDots = document.querySelectorAll('#zone-dots i');

if (zoneMap && zoneChips.length) {
  let zoneIndex = 0;
  let zoneTimer;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const showZone = (index) => {
    zoneIndex = (index + zones.length) % zones.length;
    const zone = zones[zoneIndex];
    const frame = document.querySelector('.map-frame');
    frame.classList.remove('changing');
    void frame.offsetWidth;
    frame.classList.add('changing');
    zoneMap.src = `https://www.google.com/maps?q=${encodeURIComponent(`${zone}, Trinidad, Beni, Bolivia`)}&output=embed`;
    zoneMap.title = `Mapa de ${zone}, Trinidad`;
    document.querySelector('#zone-name').textContent = zone;
    document.querySelector('#zone-position').textContent = `${zoneIndex + 1} de ${zones.length}`;
    zoneChips.forEach((chip, indexItem) => {
      const active = indexItem === zoneIndex;
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-selected', String(active));
    });
    zoneDots.forEach((dot, indexItem) => dot.classList.toggle('active', indexItem === zoneIndex));
  };

  const startZoneRotation = () => {
    if (reducedMotion) return;
    clearInterval(zoneTimer);
    zoneTimer = setInterval(() => showZone(zoneIndex + 1), 7000);
  };

  zoneChips.forEach((chip) => chip.addEventListener('click', () => {
    showZone(Number(chip.dataset.zone));
    startZoneRotation();
  }));
  document.querySelector('#zone-prev').addEventListener('click', () => {
    showZone(zoneIndex - 1);
    startZoneRotation();
  });
  document.querySelector('#zone-next').addEventListener('click', () => {
    showZone(zoneIndex + 1);
    startZoneRotation();
  });
  startZoneRotation();
}
