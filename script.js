// ---------- NAVIGATION MENU FUNCTIONS ----------
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const lineMenu = document.querySelectorAll(".line-menu");
hamburger.addEventListener("click", mobileMenu);

// TOGGLE MOBILE MENU
function mobileMenu() {
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
	lineMenu.forEach((n) => n.classList.add("active"));
}

// CLOSE MENU
function closeMenu() {
	hamburger.classList.remove("active");
	navMenu.classList.remove("active");
	wrapperMenu.classList.remove('open');
}

// TOGGLE WRAPPERMENU ON NAVIGATION LINK CLICK
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n) => n.addEventListener("click", closeMenu));
const btnNav = document.querySelectorAll(".btn-nav");
btnNav.forEach((n) => n.addEventListener("click", closeMenu));

// TOGGLE WRAPPERMENU ON HAMBURGER ICON CLICK
var wrapperMenu = document.querySelector('.wrapper-menu');
wrapperMenu.addEventListener('click', function() {
		wrapperMenu.classList.toggle('open');
	})



  
// ---------- TOGGLE LIGHT AND DARK THEME ----------
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-fill' : 'ri-sun-fill'

// Validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](iconTheme)
}

// Activate or deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Save theme and current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})




// ---------- TOGGLE ACTIVE NAVBAR LINK ----------
// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;
  
  // Now loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".nav-item [href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".nav-item [href*=" + sectionId + "]").classList.remove("active");
    }
  });
}




// ---------- REVEAL ELEMENTS ON SCROLL ----------
function reveal() {
	var reveals = document.querySelectorAll(".reveal");
	for(var i = 0; i < reveals.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = reveals[i].getBoundingClientRect().top;
		var elementVisible = 75;
		if(elementTop < windowHeight - elementVisible) {
			reveals[i].classList.add("active");
		} else {
			reveals[i].classList.remove("active");
		}
	}
}
window.addEventListener("scroll", reveal);
// Check scroll position on page load
reveal();




// ---------- SHOW/HIDE NAVBAR ON SCROLL ----------
// var lastScrollTop;
// navbar = document.getElementById('navbar');
// window.addEventListener('scroll',function(){
// var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
// if(scrollTop > lastScrollTop){
// navbar.style.top='-70px';
// }
// else{
// navbar.style.top='0';
// }
// lastScrollTop = scrollTop;
// });