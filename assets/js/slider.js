document.addEventListener("DOMContentLoaded", function() {
  var sliderContainers = document.querySelectorAll('.slider-container');

  sliderContainers.forEach(function(container) {
      var slider = container.querySelector('.slider');
      var sliderNav = container.querySelectorAll('.slider-nav a');
    
      var startX;
      var scrollLeft;
      var isDragging = false;
    
      slider.addEventListener('touchstart', function(e) {
          isDragging = true;
          startX = e.touches[0].clientX;
          scrollLeft = slider.scrollLeft;
      });
    
      slider.addEventListener('touchmove', function(e) {
          if (!isDragging) return;
          e.preventDefault();
          var x = e.touches[0].clientX;
          var walk = x - startX;
          slider.scrollLeft = scrollLeft - walk;
      });
    
      slider.addEventListener('touchend', function() {
          isDragging = false;
          var currentImage = Math.round(slider.scrollLeft / slider.offsetWidth) + 1;
          var targetScroll = (currentImage - 1) * slider.offsetWidth;
          slider.scrollTo({
              left: targetScroll,
              behavior: 'smooth'
          });

          sliderNav.forEach(function(navItem) {
              navItem.classList.remove('active');
          });
      
          var activeNavItem = container.querySelector('.slider-nav a[href="#slide-' + currentImage + '"]');
          if (activeNavItem) {
              activeNavItem.classList.add('active');
          }
      });
    
      sliderNav.forEach(function(navItem) {
          navItem.addEventListener('click', function(e) {
              e.preventDefault(); 
              var targetSlideId = this.getAttribute('href').substring(1); 
              var targetSlideIndex = parseInt(targetSlideId.substring(targetSlideId.lastIndexOf("-") + 1)); 
              var targetScroll = (targetSlideIndex - 1) * slider.offsetWidth;
              slider.scrollTo({
                  left: targetScroll,
                  behavior: 'smooth'
              });
        
              sliderNav.forEach(function(navItem) {
                  navItem.classList.remove('active');
              });
        
              this.classList.add('active');
          });
      });

      sliderNav[0].classList.add('active');
  });
});
