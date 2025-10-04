// ================================
// MAIN.JS - Funcionalidad del Index
// ================================

// Cargar datos desde JSON
async function cargarDatosDesdeJSON() {
    try {
        const response = await fetch('data/inicio.json');
        const data = await response.json();

        // Cargar paquetes
        cargarPaquetes(data.paquetes);

        // Cargar stats
        cargarStats(data.stats);

        // Cargar "Por qué elegirnos"
        cargarPorQueElegirnos(data.porQueElegirnos);

    } catch (error) {
        console.error('Error cargando datos:', error);
        mostrarMensajeError();
    }
}

// Función para cargar paquetes dinámicamente
function cargarPaquetes(paquetes) {
    const packagesContainer = document.querySelector('.packages');
    if (!packagesContainer) return;

    packagesContainer.innerHTML = '';

    paquetes.forEach(paquete => {
        const precioTexto = typeof paquete.precio === 'number'
            ? `Desde $${paquete.precio.toLocaleString('es-CO')} COP`
            : paquete.precio;

        const cardHTML = `
            <div class="product-card">
                <img src="${paquete.imagen}" alt="${paquete.titulo}" loading="lazy">
                <h3>${paquete.titulo}</h3>
                <p class="description">${paquete.descripcion}</p>
                <p class="price">${precioTexto}</p>
            </div>
        `;

        packagesContainer.innerHTML += cardHTML;
    });
}

// Función para cargar estadísticas
function cargarStats(stats) {
    const statsContainer = document.querySelector('.stats-section');
    if (!statsContainer) return;

    statsContainer.innerHTML = '';

    stats.forEach(stat => {
        const statHTML = `
            <div class="stat-card">
                <div class="stat-number">${stat.numero}</div>
                <div class="stat-label">${stat.etiqueta}</div>
            </div>
        `;

        statsContainer.innerHTML += statHTML;
    });

    setTimeout(() => animateNumbers(), 100);
}

// Función para cargar "Por qué elegirnos"
function cargarPorQueElegirnos(items) {
    const whyGrid = document.querySelector('.why-grid');
    if (!whyGrid) return;

    whyGrid.innerHTML = '';

    items.forEach(item => {
        const itemHTML = `
            <div class="why-card">
                <div class="why-icon">${item.icono}</div>
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
            </div>
        `;

        whyGrid.innerHTML += itemHTML;
    });
}

// Función para mostrar mensaje de error
function mostrarMensajeError() {
    const packagesContainer = document.querySelector('.packages');
    if (packagesContainer) {
        packagesContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fee; border-radius: 12px;">
                <h3 style="color: #c33; margin-bottom: 1rem;">⚠️ Error al cargar los paquetes</h3>
                <p style="color: #666;">Por favor, recarga la página o contacta con soporte.</p>
            </div>
        `;
    }
}

// Animación de números en las estadísticas
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasStar = text.includes('★');
        const numberOnly = text.replace(/[^\d.]/g, '');
        const targetNumber = parseFloat(numberOnly);

        if (isNaN(targetNumber)) return;

        let currentNumber = 0;
        const increment = targetNumber / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            currentNumber += increment;

            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counter);
            }

            let displayNumber = Math.floor(currentNumber);

            if (hasStar) {
                displayNumber = currentNumber.toFixed(1);
            }

            if (displayNumber >= 1000) {
                displayNumber = displayNumber.toLocaleString('es-ES');
            }

            stat.textContent = displayNumber + (hasPlus ? '+' : '') + (hasStar ? '★' : '');
        }, stepTime);
    });
}

// Intersection Observer para animaciones al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                if (entry.target.classList.contains('stats-section')) {
                    animateNumbers();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.stats-section, .why-choose-section, .features');
    animatedElements.forEach(el => observer.observe(el));
}

// Efecto parallax suave en el hero
function setupParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Agregar clase para animaciones de entrada
function addAnimationClass() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// Validación simple de formularios si existen
function setupFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');

                    field.addEventListener('input', () => {
                        field.classList.remove('error');
                    });
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Por favor, completa todos los campos requeridos');
            }
        });
    });
}

// Lazy loading para imágenes
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 TravelNow cargado correctamente');

    // Cargar datos desde JSON
    cargarDatosDesdeJSON();

    // Ejecutar funciones de inicialización
    addAnimationClass();
    setupScrollAnimations();
    setupParallax();
    setupFormValidation();
    setupLazyLoading();

    // Scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Botón de volver arriba (si existe)
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Manejo de errores de imágenes
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'assets/images/placeholder.jpg';
        console.warn('Error cargando imagen:', e.target.src);
    }
}, true);