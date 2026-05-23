document.addEventListener('DOMContentLoaded', function() {

  const productTabs = document.querySelectorAll('.block-head .filter-btn');
  const productCards = document.querySelectorAll('.card-box');

  productTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      productTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const filterValue = tab.getAttribute('data-filter');

      productCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = ''; 
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.display = 'none'; 
        }
      });
    });
  });

  const ecoTabs = document.querySelectorAll('.eco-nav .eco-btn');

  ecoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      ecoTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
    });
  });

  const switchers = document.querySelectorAll('.switcher');

  switchers.forEach(group => {
    const btns = group.querySelectorAll('.switch-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

});