// Selectors
const pageLoader = document.querySelector('.page-loader');
const header = document.querySelector('header');
const mobileMenu = document.querySelector('.mobile-menu');

/* Page Loader */
window.addEventListener('load', () => {
  addClass('loaded', document.body);
  addClass('loaded', pageLoader);
});

document.addEventListener('transitionend', () => {
  // Remove The Loader From The DOM
  pageLoader.remove();
});

/* Header */
const headerNavigationLinks = header.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  if (scrollY > header.offsetTop) {
    addClass('active', header);
  } else {
    removeClass('active', header);
  }

  updateActiveLink(headerNavigationLinks);
});

/* Mobile Menu */
const mobileMenuNavigationLinks = mobileMenu.querySelectorAll('.links a');

header.addEventListener('click', (e) => {
  if (e.target.classList.contains('mobile-menu-btn')) {
    addClass('open', mobileMenu);
    addClass('overlay', document.body);
  }
});

mobileMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-menu')) {
    removeClass('open', mobileMenu);
    removeClass('overlay', document.body);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('overlay')) {
    removeClass('open', mobileMenu);
    removeClass('overlay', document.body);
  }
});

mobileMenuNavigationLinks.forEach(link => {
  link.addEventListener('click', () => {
    removeClass('open', mobileMenu);
    removeClass('overlay', document.body);
  });
});

window.addEventListener('scroll', () => {
  updateActiveLink(mobileMenuNavigationLinks);
});

/* Show Sections Content On Page Scrolling */
window.addEventListener('scroll', () => {
  const allSections = document.querySelectorAll('section');

  allSections.forEach(sect => {
    if (scrollY >= sect.offsetTop - 200) {
      addClass('show', sect);
    }
  });
});

/* Flip Services Boxes */
const allServicesBoxes = document.querySelectorAll('.service-box');

allServicesBoxes.forEach(box => {
  box.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.textContent === "More Details") {
      addClass('fliped', box);
    } else if (e.target.textContent === "Less Details") {
      removeClass('fliped', box);
    }
  });
});

/* Toggle About Secion's Content */
const aboutFilterBtns = document.querySelectorAll('.about .about-filter li');
const aboutContent = document.querySelectorAll('.about .content');

aboutFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    updateActiveElement(aboutFilterBtns, btn);
    filterAboutContent(btn.textContent);
  });
});

/* Auto Count Stats On Page Scrolling */
const statsSection = document.querySelector('.stats');
const allNumsElements = document.querySelectorAll('.stats .box [data-target]');
let countStarted = false;

window.addEventListener('scroll', () => {
  if (statsSection.classList.contains('show')) {
    if (countStarted === false) {
      allNumsElements.forEach(num => autoCount(num));
    }
    countStarted = true;
  }
});

/* Create Projects Slider */
const projectsSlider = new Swiper('.portfolio .swiper', {
  spaceBetween: 20,
  navigation: {
    nextEl: ".portfolio .next-btn",
    prevEl: ".portfolio .prev-btn",
  },
});

/* Update Footer Copyright Year */
const footerCopyrightYearSpan = document.querySelector('footer .footer-bottom .year');

footerCopyrightYearSpan.textContent = new Date().getFullYear();

/* Website Sections Navigation Links */
const allNavigationLinks = document.querySelectorAll('[data-navigate]');

allNavigationLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    document.querySelector(link.getAttribute("data-navigate")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* Scroll To Top Button */
const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

window.addEventListener('scroll', () => {
  if (scrollY >= 80) {
    addClass('show', scrollToTopBtn);
  } else {
    removeClass('show', scrollToTopBtn);
  }
});

scrollToTopBtn.addEventListener('click', () => {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Functionality
function addClass(theClass, ele) {
  ele.classList.add(theClass);
}

function removeClass(theClass, ele) {
  ele.classList.remove(theClass);
}

function updateActiveElement(siblingsArr, selectedElement) {
  siblingsArr.forEach(ele => {
    removeClass('active', ele)
  });
  addClass('active', selectedElement);
}

function filterAboutContent(selectedContent) {
  switch (selectedContent) {
    case "Info":
      updateActiveElement(aboutContent, aboutContent[0]);
      break;
    case "Brief":
      updateActiveElement(aboutContent, aboutContent[1]);
      break;
    case "Vision":
      updateActiveElement(aboutContent, aboutContent[2]);
      break;
  }
}

function autoCount(ele) {
  let target = ele.getAttribute('data-target');
  
  let counter = setInterval(() => {
    ele.textContent++;

    if (ele.textContent == target) {
      clearInterval(counter);
    }
  }, 2000 / target);
}

function updateActiveLink(linksArr) {
  linksArr.forEach(link => {
    if (scrollY >= document.querySelector(link.getAttribute('data-navigate')).offsetTop - 130) {
      updateActiveElement(linksArr, link);
    }
  });
}