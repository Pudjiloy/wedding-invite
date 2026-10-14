// === НАСТРОЙКИ EMAILJS ===
// Вставьте ваши ID из EmailJS
const EMAILJS_PUBLIC_KEY = 'bPvpEfFxOuVZJqbnh';
const EMAILJS_SERVICE_ID = 'service_zg1y4en';
const EMAILJS_TEMPLATE_ID = 'template_7lxjixk';

// Инициализация EmailJS
(function() {
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
})();

// === ЛОГИКА ЗАГРУЗКИ (LOADER) ===
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }
}
window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 2500);

// === АНИМАЦИИ ПРИ ПРОКРУТКЕ ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in').forEach((el) => {
    observer.observe(el);
});

// === ТАЙМЕР ОБРАТНОГО ОТСЧЕТА ===
function updateCountdown() {
    const weddingDate = new Date('September 3, 2027 16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(3, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('days').textContent = "000";
        document.getElementById('hours').textContent = "00";
        document.getElementById('minutes').textContent = "00";
        document.getElementById('seconds').textContent = "00";
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// === ОТПРАВКА ФОРМЫ ЧЕРЕЗ EMAILJS ===
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Проверяем, что ID заполнены
    if (EMAILJS_PUBLIC_KEY === 'ВАШ_PUBLIC_KEY' || 
        EMAILJS_SERVICE_ID === 'ВАШ_SERVICE_ID' || 
        EMAILJS_TEMPLATE_ID === 'ВАШ_TEMPLATE_ID') {
        alert('⚠️ Ошибка: не заполнены настройки EmailJS в файле script.js!\n\nПожалуйста, вставьте Public Key, Service ID и Template ID.');
        return;
    }

    // Блокируем кнопку
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    // Собираем данные формы
    const templateParams = {
        name: document.getElementById('name').value,
        attendance: document.getElementById('attendance').value,
        guests: document.getElementById('guests').value,
        message: document.getElementById('message').value
    };

    // Отправляем через EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function() {
            alert('Спасибо! Ваша анкета отправлена. Мы очень ждём вас на нашей свадьбе! 💕');
            e.target.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, function(error) {
            alert('Произошла ошибка при отправке. Пожалуйста, свяжитесь с нами по телефону.');
            console.error('Ошибка EmailJS:', error);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
});