// Interactive Romantic Features for Alfin & Eka Website
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for nav links
  const navLinks = document.querySelectorAll('.navbar-menu a[href^=\"#\"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

// Static hero description
  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) {
    heroDesc.textContent = 'Kisah kita dimulai dari sebuah pertemuan yang tak pernah direncanakan 2 langkah yang awalnya asing, lalu perlahan menjadi satu cerita yang tak ingin selesai...';
  }

  // Removed floating hearts animation

  // Kenangan slider
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.section-card');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (slider && slides.length > 0) {
    let currentSlide = 0;
    const slideWidth = slides[0].offsetWidth + 32; // margin included
    
    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
      goToSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
      goToSlide(currentSlide);
    });
    
    // Auto-play
    setInterval(() => {
      nextBtn.click();
    }, 4000);
  }

  // Album lightbox
  const albumImages = document.querySelectorAll('.album-img img');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-content" id="modal-img">
  `;
  document.body.appendChild(modal);
  
  const closeModal = document.querySelector('.close');
  const modalImg = document.getElementById('modal-img');
  
  albumImages.forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
    });
  });
  
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Fade-in animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.about-card, .section-card, .album-img img').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // Mobile menu toggle (add hamburger in HTML)
  const hamburger = document.querySelector('.navbar-hamburger');
  const mobileMenu = document.querySelector('.navbar-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
});
