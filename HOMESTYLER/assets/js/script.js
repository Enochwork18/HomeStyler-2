// 'use strict';

// Navbar functionality
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};
const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

// Add event listeners to navbar elements
addEventOnElem(navTogglers, "click", toggleNavbar);
addEventOnElem(navbarLinks, "click", closeNavbar);

// Header & back-to-top button active on scroll
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
const showElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

// Add scroll event listener to window
window.addEventListener("scroll", showElemOnScroll);

// Product filter
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterBox = document.querySelector("[data-filter]");
let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;
  filterBox.setAttribute("data-filter", this.dataset.filterBtn);
  filterProducts(this.dataset.filterBtn);
};

// Add event listeners to filter buttons
addEventOnElem(filterBtns, "click", filter);

// Search functionality
const searchInput = document.getElementById('search-input');
const allProducts = document.querySelectorAll('.product-card');

function filterAndGroupProducts(searchTerm) {
  const filteredProducts = Array.from(allProducts).filter(product => {
    return product.textContent.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Show filtered products
  allProducts.forEach(product => {
    product.parentElement.style.display = 'none'; // Hide all products initially
  });
  filteredProducts.forEach(product => {
    product.parentElement.style.display = 'block'; // Show filtered products
  });
}

function filterProducts(category) {
  allProducts.forEach(product => {
    if (category === 'all' || product.parentElement.classList.contains(category)) {
      product.parentElement.style.display = 'block'; // Show product if it matches the category
    } else {
      product.parentElement.style.display = 'none'; // Hide product if it doesn't match
    }
  });
}

// Sort functionality
const sortSelect = document.createElement('select');
sortSelect.innerHTML = `
  <option value="default">Sort by</option>
  <option value="price-asc">Price: Low to High</option>
  <option value="price-desc">Price: High to Low</option>
`;
document.querySelector('.title-wrapper').appendChild(sortSelect);

sortSelect.addEventListener('change', function() {
  const sortValue = this.value;
  const productList = Array.from(allProducts).map(product => product.parentElement);
  
  if (sortValue === 'price-asc') {
    productList.sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.price').getAttribute('value'));
      const priceB = parseFloat(b.querySelector('.price').getAttribute('value'));
      return priceA - priceB;
    });
  } else if (sortValue === 'price-desc') {
    productList.sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.price').getAttribute('value'));
      const priceB = parseFloat(b.querySelector('.price').getAttribute('value'));
      return priceB - priceA;
    });
  }

  const productListContainer = document.querySelector('.product-list');
  productListContainer.innerHTML = '';
  productList.forEach(product => productListContainer.appendChild(product));
});

// Debounce function to limit the frequency of function calls
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
};

// Combine debounce with filterAndGroupProducts for both search inputs
const handleSearchInput = debounce(function (e) {
  const searchTerm = e.target.value.trim();
  if (searchTerm) {
    filterAndGroupProducts(searchTerm);
  } else {
    // If the search input is empty, reset the filter
    allProducts.forEach(product => {
      product.parentElement.style.display = 'block'; // Show all products
    });
  }
}, 300);

searchInput.addEventListener('input', handleSearchInput);

// Function to add event listeners
function addEventOnElem(elem, type, callback) {
  if (elem.length && elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else if (elem.length === undefined) {
    elem.addEventListener(type, callback);
  }
}


// video

// function myHeader(){
//   let header = document.getElementById("header");
//   let lol = document.getElementById("lol");
//   window.addEventListener("scroll" , function(){
//       if(window.scrollY > 0){
//           header.classList.add("active");
//           lol.src = "pic/bulb2.png";
//       }else{
//           header.classList.remove("active");
//           lol.src = "pic/bulb.png";
//       }
      
//   })
// }
// myHeader();

// function myBars(){
//   let bars = document.querySelector("#bar");
//   let nav = document.querySelector(".navigation");
//   bars.onclick = function(){
//       if(nav.style.right == "0%"){
//           nav.style.right = "-50%";
//           bars.src = "pic/menu.png"
//       }else{
//           nav.style.right = "0%";
//           bars.src = "pic/x.png"
//       }
//       nav.classList.toggle("new")
//   }
  
  
// }
// myBars()

// function myFun(){
//   let plus = document.querySelector(".plus");
//   let textBox = document.querySelector(".text-box ");
//   plus.onclick = ()=>{
//       textBox.classList.toggle("active");
//       plus.classList.toggle("img_active")
//   }
// }
// myFun()

// function myVideo(){
//   let links = document.querySelector(".link_a");
//   let overs = document.querySelector(".bg-show .overlay");
//   let exit = document.querySelector(".cancel");
//   let player = document.querySelector(".player");
//   let videos = document.getElementById("video");
//   links.onclick = (ed)=>{
//       ed.preventDefault();
//       overs.style.display = "block"
//   }
//   exit.onclick = ()=>{
//       overs.style.display = "none"
//   }
//   player.onclick = ()=>{
//       if(videos.paused){
//           videos.play();
//           player.src = "pic/pause.png"
//       }else{
//           videos.pause();
//           player.src = "pic/play.png"
//       }
//   }
// }
// myVideo();

// function toTop(){
//   let top = document.querySelector(".top");
//   window.onscroll = ()=>{
//       if(window.scrollY > 100 || document.documentElement.scrollTop > 100){
//           top.style.display = "block"
//       }else{
//           top.style.display = "none"
//       }
//   }

//   top.onclick = ()=>{
//       scrollTo(0,0)
//   }

// }
// toTop();







