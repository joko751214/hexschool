const animateScrollObserver = new IntersectionObserver(
  (entries, animatedScrollObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('enter');
        animatedScrollObserver.unobserve(entry.target);
      }
    });
    // 當目標元素25%可見時，處發回調函數
  }, { threshold: [0.5] },
);

export default {
  bind(el) {
    el.classList.add('before-enter');
    animateScrollObserver.observe(el);
  },
};
