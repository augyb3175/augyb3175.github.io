// Keep the existing IntersectionObserver for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }
);

document.querySelectorAll('.hidden').forEach((el) => {
  observer.observe(el);
});

// Add typewriter effect functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP if available
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  // Typewriter function for text animation
  function typeWriter(element, text, speed = 50, delay = 0) {
    return new Promise(resolve => {
      let i = 0;
      const originalText = text || element.textContent;
      element.textContent = '';
      
      setTimeout(() => {
        function type() {
          if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
          } else {
            resolve();
          }
        }
        type();
      }, delay);
    });
  }
  
  // Animate hero title and subtitle
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  
  if (heroTitle && heroSubtitle) {
    const titleText = heroTitle.textContent;
    const subtitleText = heroSubtitle.textContent;
    
    heroTitle.textContent = '';
    heroSubtitle.textContent = '';
    
    // Type hero text with a small delay
    setTimeout(() => {
      typeWriter(heroTitle, titleText, 100)
        .then(() => typeWriter(heroSubtitle, subtitleText, 50));
    }, 500);
  }
  
  // Scroll-triggered typewriter effects
  document.querySelectorAll('.typewriter-trigger').forEach(element => {
    const originalText = element.textContent;
    element.textContent = '';
    
    // Use ScrollTrigger if GSAP is available, otherwise use IntersectionObserver
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: element,
        start: "top 70%",
        onEnter: () => typeWriter(element, originalText, 50),
        once: true
      });
    } else {
      // Fallback to IntersectionObserver
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            typeWriter(element, originalText, 50);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(element);
    }
  });
});
