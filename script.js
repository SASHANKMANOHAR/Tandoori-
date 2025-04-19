// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');
  
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.add('open');
  });
  
  closeMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
    });
  });
  
  // Menu Filtering
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active tab
      menuTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Filter menu items
      menuItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(' ');
        if (category === 'all' || itemCategories.includes(category)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Gallery Modal
  const galleryImages = document.querySelectorAll('.gallery-img');
  const galleryModal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');
  const closeGallery = document.getElementById('closeGallery');
  const prevImage = document.getElementById('prevImage');
  const nextImage = document.getElementById('nextImage');
  let currentImageIndex = 0;
  
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      modalImage.src = imgSrc;
      currentImageIndex = index;
      galleryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeGallery.addEventListener('click', function() {
    galleryModal.classList.remove('open');
    document.body.style.overflow = 'auto';
  });
  
  prevImage.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImage.src = galleryImages[currentImageIndex].querySelector('img').src;
  });
  
  nextImage.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    modalImage.src = galleryImages[currentImageIndex].querySelector('img').src;
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryModal.classList.contains('open')) {
      galleryModal.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Form Handling - Reservation
  const reservationForm = document.getElementById('reservationForm');
  const reservationConfirmation = document.getElementById('reservationConfirmation');
  
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const guests = document.getElementById('guests').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      
      if (!name || !email || !phone || !guests || !date || !time) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Store in localStorage
      const formData = {
        name: name,
        email: email,
        phone: phone,
        guests: guests,
        date: date,
        time: time,
        special: document.getElementById('special').value
      };
      
      localStorage.setItem('reservationData', JSON.stringify(formData));
      
      // Show confirmation
      reservationForm.reset();
      reservationConfirmation.style.display = 'block';
      
      // Hide confirmation after 5 seconds
      setTimeout(() => {
        reservationConfirmation.style.display = 'none';
      }, 5000);
    });
  }
  
  // Form Handling - Contact
  const contactForm = document.getElementById('contactForm');
  const contactConfirmation = document.getElementById('contactConfirmation');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Store in localStorage
      const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
      };
      
      localStorage.setItem('contactData', JSON.stringify(formData));
      
      // Show confirmation
      contactForm.reset();
      contactConfirmation.style.display = 'block';
      
      // Hide confirmation after 5 seconds
      setTimeout(() => {
        contactConfirmation.style.display = 'none';
      }, 5000);
    });
  }
  
  // Scroll to Top Button
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.id = 'scrollToTop';
  scrollToTopButton.classList.add('scroll-top');
  scrollToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  document.body.appendChild(scrollToTopButton);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopButton.style.display = 'flex';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });
  
  scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initialize menu to show all items by default
  document.querySelector('.menu-tab[data-category="all"]').click();
  
  // Load saved preferences from localStorage if they exist
  const loadUserPreferences = () => {
    // Check if there's a theme preference in localStorage
    const storedTheme = localStorage.getItem('preferredTheme');
    if (storedTheme) {
      // Would implement theme switching here if we had a dark mode
    }
    
    // Check if user has made a reservation previously
    const savedReservation = localStorage.getItem('reservationData');
    if (savedReservation && reservationForm) {
      const reservationData = JSON.parse(savedReservation);
      
      // You could optionally pre-fill the form or show a message
      // that the user has a pending reservation
      // For privacy reasons, we're not pre-filling in this implementation
    }
  };
  
  loadUserPreferences();
  
  // Add scroll event for navbar (to change styles on scroll)
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      navbar.style.padding = '0.75rem 0';
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.padding = '1rem 0';
      navbar.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
  });
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add date validation for reservation form
  const dateInput = document.getElementById('date');
  if (dateInput) {
    // Set min date to today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    
    const todayString = yyyy + '-' + mm + '-' + dd;
    dateInput.setAttribute('min', todayString);
    
    // Set max date to 3 months from now
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const dd2 = String(threeMonthsLater.getDate()).padStart(2, '0');
    const mm2 = String(threeMonthsLater.getMonth() + 1).padStart(2, '0');
    const yyyy2 = threeMonthsLater.getFullYear();
    
    const maxDateString = yyyy2 + '-' + mm2 + '-' + dd2;
    dateInput.setAttribute('max', maxDateString);
  }
});
