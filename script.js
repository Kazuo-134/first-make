document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Modal functionality
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTech = document.getElementById('modalTech');
    
    document.querySelectorAll('.project-more').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            modalTitle.innerText = card.dataset.title || 'Project Title';
            modalDesc.innerText = card.dataset.desc || 'Project description...';
            modalTech.innerText = card.dataset.tech || 'Technology Used';
            modal.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger on load
    
    // Animate stats
    const stats = document.querySelectorAll('.mini-stats strong[data-count]');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const isPercent = stat.innerText.includes('%');
        
        const updateCount = () => {
            const increment = target / 50;
            if (count < target) {
                count += Math.ceil(increment);
                stat.innerText = count + (isPercent ? '%' : '');
                setTimeout(updateCount, 40);
            } else {
                stat.innerText = target + (isPercent ? '%' : '');
            }
        };
        // wait for element to be visible before animating
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        observer.observe(stat);
    });
});
