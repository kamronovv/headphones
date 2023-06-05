'use scrict';
// Header
const header = document.getElementById('header');
// Navbar
const nav = document.querySelector('.navbar');
// Modals
const modalSearch = document.querySelector('.modal__search');
const modalCart = document.querySelector('.modal__cart');
const modalContact = document.querySelector('.modal__contact');
const backdrop = document.querySelector('.overlay');
const sidebarBackdrop = document.querySelector('.sidebar__overlay');
const btnCloseModalSearch = document.querySelector('.modal__search-close');
const btnCloseModalCart = document.querySelector('.modal__cart-close');
const btnCloseModalContact = document.querySelector('.modal__contact-close');
const btnsOpenModal = document.querySelectorAll('.features__link');
const btnPurchase = document.querySelector('.purchase');
const detailHeadphone = document.getElementById('section--2');

// Sidebar
const sidebar = document.querySelector('.sidebar');
const sidebarList = document.querySelector('.sidebar__list');
const sidebarTab = document.querySelector('.hamburger__tab');
const sidebarClose = document.querySelector('.sidebar__close');

// Scroll up
const scrollToUp = document.querySelector('.scroll-up');

////////////////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  const parentEl = this.closest('.features__item');
  if (parentEl.getAttribute('id') === 'search')
    modalSearch.classList.remove('hidden');
  if (parentEl.getAttribute('id') === 'cart')
    modalCart.classList.remove('hidden');
  if (parentEl.getAttribute('id') === 'contact')
    modalContact.classList.remove('hidden');
  backdrop.classList.remove('hidden');
};

const openModalSearch = function () {
  modalSearch.classList.remove('hidden');
  backdrop.classList.remove('hidden');
};

const closeModal = function (e) {
  // e.preventDefault();
  modalSearch.classList.add('hidden');
  modalCart.classList.add('hidden');
  modalContact.classList.add('hidden');
  backdrop.classList.add('hidden');
};

// open modal
btnsOpenModal.forEach((btnOpenModal) =>
  btnOpenModal.addEventListener('click', openModal)
);

// close modal
btnCloseModalSearch.addEventListener('click', closeModal);
btnCloseModalCart.addEventListener('click', closeModal);
btnCloseModalContact.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 90 && e.ctrlKey) {
    openModalSearch();
  }
  if (e.key === 'Escape' && !modalSearch.classList.contains('hidden')) {
    closeModal();
  }
  if (e.key === 'Escape' && !modalCart.classList.contains('hidden')) {
    closeModal();
  }
  if (e.key === 'Escape' && !modalContact.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////
// Sidebar
const openSidebar = function (e) {
  sidebar.classList.remove('sidebar__move');
  sidebarBackdrop.classList.remove('hidden');
};

const closeSidebar = function () {
  sidebar.classList.add('sidebar__move');
  sidebarBackdrop.classList.add('hidden');
};

// Sidebar open
sidebarTab.addEventListener('click', openSidebar);

// Sidebar close
sidebarClose.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

///////////////////////////////////////
// Button Scrolling
btnPurchase.addEventListener('click', function (e) {
  // const s1coords = detailHeadphone.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth,
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  detailHeadphone.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////
// Scroll up
window.addEventListener('scroll', function () {
  window.pageYOffset >= 270
    ? scrollToUp.classList.remove('scroll-up--hidden')
    : scrollToUp.classList.add('scroll-up--hidden');
});

scrollToUp.addEventListener('click', function () {
  header.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////
// Page navigation
/*
document.querySelectorAll('.sidebar__link').forEach(function (el) {
  console.log(el);
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    closeSidebar();
  });
});
*/

sidebarList.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('sidebar__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    closeSidebar();
  }
});

/////////////////////////////////////////////////
// Fade animation
const handleOver = function (e) {
  if (e.target.classList.contains('sidebar__link')) {
    const link = e.target;
    let siblings = link.closest('.sidebar').querySelectorAll('.sidebar__link');

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};

sidebarList.addEventListener('mouseover', handleOver.bind(0.5));
sidebarList.addEventListener('mouseout', handleOver.bind(1));

///////////////////////////////////////////////////////
// Tabbed components
const lastProducts = document.querySelector('.last__products');
const detailImg = document.querySelector('.detail__img');
const projectLink = location.href;

lastProducts.addEventListener('click', function (e) {
  const dataTab = e.target.dataset.tab;
  if (e.target.classList.contains(`last__product--img-${dataTab}`)) {
    const currentImg = e.target;
    const siblings = e.target
      .closest('.last__products--main')
      .querySelectorAll('.last__product--img');

    if (detailImg.src !== `${projectLink}images/last-product-${dataTab}.png`) {
      detailImg.src = `/images/last-product-${dataTab}.png`;
      currentImg.src = `/images/last-detail-headphone.png`;
    } else if (
      currentImg.src === `${projectLink}images/last-detail-headphone.png`
    ) {
      currentImg.src = `/images/last-product-${dataTab}.png`;
      detailImg.src = `/images/last-detail-headphone.png`;
    }

    siblings.forEach((el, i) => {
      if (el !== currentImg) {
        el.src = `/images/last-product-${i + 1}.png`;
      }
    });
  }
});

// Added to cart
const cartProducts = document.querySelector('.modal__cart--products');
const productsCartArray = [];
document.querySelectorAll('.last__icon--cart-icon').forEach((el) => {
  el.addEventListener('click', function (e) {
    cartProducts.innerHTML = '';

    // Image
    const image = document.querySelector(
      `.last__product--img-${e.target.dataset.cart}`
    );
    const cloneImage = image.cloneNode(true);
    cloneImage.className = '';
    cloneImage.classList.add('last__product--img');

    // Price
    const price = document.querySelector(
      `.last__product--price-${e.target.dataset.cart}`
    );
    const clonePrice = price.cloneNode(true);
    clonePrice.className = '';

    //Name
    const name = document.querySelector(
      `.last__product--name-${e.target.dataset.cart}`
    );
    const cloneName = name.cloneNode(true);
    cloneName.className = '';

    const checkingProductsArray = productsCartArray.find((el) =>
      el.cloneImage.currentSrc === cloneImage.currentSrc ? true : false
    );

    if (!checkingProductsArray) {
      productsCartArray.push({ cloneImage, clonePrice, cloneName });
    }

    productsCartArray.forEach((el) => {
      console.log(el);
      const html = `
        <div class="modal__cart--product">
           <img src="${el.cloneImage.currentSrc}" class="${el.cloneImage.className}" alt="${el.cloneImage.alt}"/>
           <p class="modal__cart--product-price font__18">${el.clonePrice.innerText}</p>
           <p class="modal__cart--product-name font__18">${el.cloneName.innerText}</p>
           <button class="modal__cart--product-btn font__24">&times;</button>
        </div>
      `;
      cartProducts.insertAdjacentHTML('beforeend', html);
    });
  });
});

/*
//////////////////////////////////////////////////////
// Sticky navigation
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function (e) {
  console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

// Sticky navigation: Intersection Observer API
/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

observer.observe(section1);
*/

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight + 10}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Loading images
const allImages = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.6,
});

allImages.forEach((img) => imgObserver.observe(img));

// Lazy collection images
const collectImages = document.querySelectorAll('.collection');

const collectImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('lazy-img');
  observer.unobserve(entry.target);
};

const collectImgObserver = new IntersectionObserver(collectImg, {
  root: null,
  threshold: 0.6,
});

collectImages.forEach((collect) => collectImgObserver.observe(collect));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('li[data-list]');
  const btnRight = document.querySelector('.last__collection--rarr');
  const btnLeft = document.querySelector('.last__collection--larr');
  const dotsSlider = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;
  // Create array of item of images
  const carouselData = [...slides];
  // Create array of amount of images
  const carouselIndex = [];
  for (let i = curSlide; i < maxSlide; i++) {
    carouselIndex.push(i);
  }

  // Functions
  function createDots() {
    slides.forEach((_, i) => {
      dotsSlider.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i + 1}"></button>`
      );
    });
  }

  function activateDot(slide = 2) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  function findActiveSlide() {
    slides.forEach((s) => {
      if (s.classList.contains('last__collection-item--2')) {
        const activeSlide = s.dataset.list;
        activateDot(activeSlide);
      } else {

      }
    });
  }

  const nextSlide = function () {
    // Take the last item and add it to the beginning of the array so that the next item is front
    carouselIndex.unshift(carouselIndex.pop());

    carouselIndex.forEach((item, index) => {
      document.querySelector('.last__collection-imgs').children[
        index
      ].className = `last__collection-img--sub last__collection-img last__collection-item--${
        item + 1
      }`;
    });

    findActiveSlide();
  };

  const prevSlide = function () {
    // Push the first item to the end of the array so that the previous item is front
    carouselIndex.push(carouselIndex.shift());

    carouselIndex.forEach((item, index) => {
      document.querySelector('.last__collection-imgs').children[
        index
      ].className = `last__collection-img--sub last__collection-img last__collection-item--${
        item + 1
      }`;
    });

    findActiveSlide();
  };

  const init = function () {
    createDots();
    activateDot();
  };

  init();

  // Event handler
  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};

slider();
