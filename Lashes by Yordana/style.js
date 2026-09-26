// ======================
// YOUR EXACT SCROLL LOGIC (jQuery)
// ======================
(function () {
    $(window).scroll(function () { 
        var Num = $(window).scrollTop() / 500;          // shade opacity
        var Num2 = $(window).scrollTop() * 0.0004;      // zoom factor
        var Num2mod = Num2 + 1;                          // scale 
        var Num3 = $(window).scrollTop() * 0.2;          // title margin
        var Num3mod = Num3;                              

        $('.shade').css('opacity', Num);
        $(".bg").css({"transform": "scale(" + Num2mod + ")"});
        $(".text").css({"margin-top": "-" + Num3mod + "px"});
    });
}.call(this));

$(document).ready(function(){
    $(window).scroll(); // set initial values
});

// ======================
// SMOOTH MOUSE CAROUSEL LOGIC
// ======================
(function() {
    const container = document.getElementById('carouselContainer');
    const track = document.getElementById('carouselTrack');
    
    // Текуща позиция
    let currentTranslateX = 0;
    // Целева позиция (където искаме да отидем)
    let targetTranslateX = 0;
    // Анимационна функция
    let animationFrame = null;
    
    function getMaxOffset() {
        const containerWidth = container.offsetWidth;
        const trackWidth = track.scrollWidth;
        return Math.max(0, trackWidth - containerWidth);
    }

    // Плавна анимация
    function smoothAnimation() {
        // Interpolation - бавно приближаване към целта
        currentTranslateX += (targetTranslateX - currentTranslateX) * 0.01;
        
        // Прилагаме трансформацията
        track.style.transform = `translateX(${currentTranslateX}px)`;
        
        // Продължаваме анимацията
        animationFrame = requestAnimationFrame(smoothAnimation);
    }
    
    // Стартираме анимацията
    smoothAnimation();

    function handleMouseMove(e) {
        const rect = container.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        mouseX = Math.max(0, Math.min(mouseX, rect.width));
        const ratio = mouseX / rect.width;
        const maxOffset = getMaxOffset();
        
        // Целева позиция (където искаме да отидем)
        targetTranslateX = - (ratio * maxOffset);
    }

    container.addEventListener('mousemove', handleMouseMove);
    
    // Спираме анимацията когато напуснем контейнера
    container.addEventListener('mouseleave', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    });
    
    // Рестартираме анимацията когато влезем
    container.addEventListener('mouseenter', () => {
        if (!animationFrame) {
            smoothAnimation();
        }
    });
    
    window.addEventListener('resize', () => {
        targetTranslateX = 0;
        currentTranslateX = 0;
        track.style.transform = `translateX(0px)`;
    });
})();
// ======================
// NAVBAR FUNCTIONALITY
// ======================

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change icon
            const icon = mobileMenu.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
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
});
// ======================
// FAQ ACCORDION
// ======================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
});
$(document).ready(function() {
    $('.nav-link').click(function(e) {
        e.preventDefault();
        
        var target = $(this).attr('href');
        var offsetValue = 80; // стандартна стойност
        
        // Индивидуален offset за всеки бутон
        if (target === "#carouselContainer") offsetValue = 290;  // за снимки (твоята голяма стойност)
        if (target === "#prices") offsetValue = 70;             // за цени
        if (target === "#about") offsetValue = 30;              // за мен
        if (target === "#faq") offsetValue = 100;
        if (target === "#karta") offsetValue = 220;                // за въпроси
        if (target === "#contact") offsetValue = 50;              // за контакти
        
        var offset = $(target).offset().top - offsetValue;
        
        $('html, body').animate({
            scrollTop: offset
        }, 600);
    });
});
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollToTopBtn').addClass('show');
        } else {
            $('#scrollToTopBtn').removeClass('show');
        }
    });
    
    $('#scrollToTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
});
// ======================
// BACKGROUND PARALLAX - ЛЕКО ПРИБИРАНЕ
// ======================
window.addEventListener('scroll', function() {
    let scrollPosition = window.pageYOffset;
    let heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        // Прибиране на background-а (по-бавно от скрола)
        heroBg.style.transform = 'translateY(' + scrollPosition * 0.3 + 'px)';
        
        // Леко намаляване на мащаба (по желание)
        // heroBg.style.transform = 'scale(' + (1 - scrollPosition * 0.0005) + ')';
    }
});



