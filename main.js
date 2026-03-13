document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("myAudio");

    document.body.addEventListener("click", function () {
        audio.play().catch(() => {
            console.log("Autoplay diblokir browser");
        });
    }, { once: true });
});

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

// One-time typing effect (stops after complete)
  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) {
    const text = 'Kisah cinta kami dimulai dari sebuah pertemuan yang tak pernah direncanakan, dua langkah yang awalnya asing lalu perlahan menjadi satu cerita yang tak ingin selesai...';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroDesc.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    heroDesc.textContent = '';
    setTimeout(typeWriter, 500);
  }

// Day counter
  function updateDays() {
    const startDate = new Date('2024-09-04');
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const daysEl = document.getElementById('days');
    if (daysEl) {
      daysEl.textContent = diffDays;
    }
  }
  updateDays();

  // Improved infinite kenangan slider
  const slider = document.querySelector('.slider');
  const slides = Array.from(document.querySelectorAll('.section-card'));
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (slider && slides.length > 3) {
    const totalSlides = slides.length;
    const cloneCount = 3;
    let currentIndex = cloneCount;
    let isTransitioning = false;

    // Clone slides for infinite loop
    const firstClones = slides.slice(0, cloneCount);
    const lastClones = slides.slice(-cloneCount);
    
    firstClones.forEach(clone => slider.appendChild(clone.cloneNode(true)));
    lastClones.forEach(clone => slider.insertBefore(clone.cloneNode(true), slider.firstChild));
    
    const allSlides = slider.querySelectorAll('.section-card');
    const slideWidth = allSlides[0].offsetWidth + 32; // account for gap

    // Create dots for original slides only
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.dataset.slide = index;
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      // Update active dot (map to original index)
      const originalIndex = (currentIndex - cloneCount + totalSlides) % totalSlides;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[originalIndex].classList.add('active');
    }

    function moveNext() {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentIndex++;
      slider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      updateSlider();
      
      if (currentIndex >= totalSlides + cloneCount) {
        setTimeout(() => {
          slider.style.transition = 'none';
          currentIndex = cloneCount;
          updateSlider();
          isTransitioning = false;
        }, 500);
      } else {
        setTimeout(() => { isTransitioning = false; }, 500);
      }
    }

    function movePrev() {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentIndex--;
      slider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      updateSlider();
      
      if (currentIndex < 0) {
        setTimeout(() => {
          slider.style.transition = 'none';
          currentIndex = totalSlides - 1;
          updateSlider();
          isTransitioning = false;
        }, 500);
      } else {
        setTimeout(() => { isTransitioning = false; }, 500);
      }
    }

    // Event listeners
    nextBtn.addEventListener('click', moveNext);
    prevBtn.addEventListener('click', movePrev);
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (isTransitioning) return;
        const targetIndex = index + cloneCount;
        if (Math.abs(targetIndex - currentIndex) > 1) {
          slider.style.transition = 'none';
          currentIndex = targetIndex;
          updateSlider();
        }
        slider.style.transition = 'transform 0.5s ease';
      });
    });

    // Auto-play
    setInterval(moveNext, 4000);
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
