const apiKey = "cbc346cd957ffaa08a748e6218f2b354"; // Reemplaza con tu clave de OpenWeatherMap
const city = "Pedernales";
const country = "EC";


function actualizarClima() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=es&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      document.querySelector(".weather-location").textContent = data.name;
      document.querySelector(".weather-temp").textContent = `${Math.round(data.main.temp)}°C`;
      document.querySelector(".weather-desc").textContent = data.weather[0].description;
      document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })
    .catch(error => console.error("Error al obtener el clima:", error));
}

// Llamada inicial
actualizarClima();

// Actualizar cada 10 minutos
setInterval(actualizarClima, 600000);

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.fa-bars');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    const navAnchors = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll('section[id], footer[id], header[id]');

    // --- Menú hamburguesa ---
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    });

    // --- Scroll suave con compensación para header fijo ---
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80; // Ajusta según la altura de tu header
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else if (this.getAttribute('href') === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // --- Resaltar enlace activo y animar secciones ---
    if (sections.length && navAnchors.length) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = document.querySelector(`a[href="#${id}"]`);

                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    if (link) {
                        navAnchors.forEach(a => a.classList.remove('active'));
                        link.classList.add('active');
                    }
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);

        sections.forEach(s => sectionObserver.observe(s));
    }
});