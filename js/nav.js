(function() {
  'use strict';

  const menuData = {
    "for-people": [
      { name: "Карты", blocks: [
        { name: "Дебетовые карты", items: [
          { text: "Альфа-Карта", link: "#" },
          { text: "Альфа-Карта с гравировкой", link: "#" },
          { text: "Платёжные Альфа-Стикеры", link: "#" },
          { text: "Mяy-Карта", link: "#" },
          { text: "Карта Alfa Only", link: "#" },
          { text: "Детская карта", link: "#" },
          { text: "Alfa Travel", link: "#" },
          { text: "Карта Апельсин", link: "#" }
        ]},
        { name: "Кредитные карты", items: [
          { text: "Кредитная карта 100 дней", link: "#" },
          { text: "Полезные статьи", link: "#" }
        ]},
        { name: "Специальные условия", items: [
          { text: "Альфа-Карта для зарплаты", link: "#" },
          { text: "Альфа-Карта с комбо-счётом", link: "#" },
          { text: "Зарплата каждый день", link: "#" },
          { text: "15 привилегий Альфа-Смарт", link: "#" }
        ]}
      ]},
      { name: "Накопления", blocks: [] },
      { name: "Кредиты", blocks: [] },
      { name: "Ипотека", blocks: [] },
      { name: "Инвестиции", blocks: [] },
      { name: "Альфа-Смарт", blocks: [] },
      { name: "Alfa Only", blocks: [] },
      { name: "Мобильная связь", blocks: [] },
      { name: "Самозанятость", blocks: [] },
      { name: "Семья и дети", blocks: [] },
      { name: "Иностранцы", blocks: [] },
      { name: "А-Клуб", blocks: [] },
      { name: "Ещё", blocks: [] }
    ],
    "for-business": [],
    "for-corporate": []
  };

  const dropdownMenu = document.createElement('div');
  dropdownMenu.className = 'nav-dropdown';
  const overlayLayer = document.createElement('div');
  overlayLayer.className = 'nav-overlay';
  document.body.append(dropdownMenu, overlayLayer);

  const navTriggers = document.querySelectorAll('.nav-item[data-type]');

  const toggleMenuVisibility = (show) => {
    dropdownMenu.classList.toggle('is-active', show);
    overlayLayer.classList.toggle('is-active', show);
  };

  const buildMenuStructure = (category) => {
    const menuItems = menuData[category];
    if (!menuItems?.length) return;

    dropdownMenu.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const menuWrapper = document.createElement('div');
    menuWrapper.className = 'nav-dropdown__wrapper';

    const menuSidebar = document.createElement('div');
    menuSidebar.className = 'nav-dropdown__categories';

    const menuContent = document.createElement('div');
    menuContent.className = 'nav-dropdown__content';

    menuItems.forEach((item, idx) => {
      const triggerBtn = document.createElement('button');
      triggerBtn.type = 'button';
      triggerBtn.className = 'nav-dropdown__category';
      triggerBtn.textContent = item.name;
      triggerBtn.dataset.index = idx;

      triggerBtn.addEventListener('mouseenter', () => {
        menuSidebar.querySelectorAll('.nav-dropdown__category').forEach(el => {
          el.classList.remove('is-active');
        });
        triggerBtn.classList.add('is-active');

        menuContent.innerHTML = '';
        if (item.blocks?.length) {
          item.blocks.forEach(block => {
            const blockWrapper = document.createElement('div');
            blockWrapper.className = 'nav-dropdown__block';

            const blockTitle = document.createElement('h4');
            blockTitle.className = 'nav-dropdown__block-title';
            blockTitle.textContent = block.name;
            blockWrapper.appendChild(blockTitle);

            if (block.items?.length) {
              const linksList = document.createElement('ul');
              linksList.className = 'nav-dropdown__list';
              block.items.forEach(linkData => {
                const linkEl = document.createElement('a');
                linkEl.href = linkData.link;
                linkEl.className = 'nav-dropdown__link';
                linkEl.textContent = linkData.text;
                linksList.appendChild(linkEl);
              });
              blockWrapper.appendChild(linksList);
            }
            menuContent.appendChild(blockWrapper);
          });
        } else {
          menuContent.textContent = 'Раздел в разработке';
        }
      });

      menuSidebar.appendChild(triggerBtn);
      if (idx === 0) triggerBtn.dispatchEvent(new MouseEvent('mouseenter'));
    });

    menuWrapper.append(menuSidebar, menuContent);
    fragment.appendChild(menuWrapper);
    dropdownMenu.appendChild(fragment);
  };

  navTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      buildMenuStructure(trigger.dataset.type);
      toggleMenuVisibility(true);
    });
  });

  dropdownMenu.addEventListener('mouseleave', () => toggleMenuVisibility(false));
  overlayLayer.addEventListener('click', () => toggleMenuVisibility(false));
})();