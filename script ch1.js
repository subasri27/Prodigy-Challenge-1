// Add scroll event listener to window
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    
    // Add 'sticky' class when user scrolls past a certain point
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });