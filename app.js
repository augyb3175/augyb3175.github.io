const observerOptions = {
    root: null, // setting the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // 10% of the target's visibility
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Optional: Stop observing the target after it's shown
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
