// Load testimonials from JSON and render them
(function() {
  // Determine the path to testimonials.json based on current page location
  const baseURL = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
  const jsonPath = baseURL.includes('/testimonials')
    ? '../wp-content/themes/medievalmile/assets/data/testimonials.json'
    : 'wp-content/themes/medievalmile/assets/data/testimonials.json';

  fetch(jsonPath)
    .then(response => response.json())
    .then(testimonials => {
      renderTestimonials(testimonials);
    })
    .catch(error => console.error('Error loading testimonials:', error));

  function renderTestimonials(testimonials) {
    const carouselContainer = document.querySelector('.quote_box__slider');
    const testimonialPage = document.body.classList.contains('page-testimonials') ||
                           document.querySelector('body').textContent.includes('Testimonials');

    // Determine which testimonials to show and where
    const testimonialsToShow = carouselContainer ? testimonials.slice(0, 4) : testimonials;
    const renderOn = carouselContainer ? carouselContainer : document.querySelector('[data-id*="quote_box"]');

    if (!renderOn) return;

    // Clear existing hardcoded testimonials
    const existingSlides = renderOn.querySelectorAll('.quote_box__slide');
    existingSlides.forEach(slide => slide.remove());

    const existingQuoteBoxes = document.querySelectorAll('.quote_box');
    if (!carouselContainer && existingQuoteBoxes.length > 1) {
      // On testimonials page, remove all hardcoded quote boxes
      existingQuoteBoxes.forEach((box, idx) => {
        if (idx > 0) { // Keep the first one to use as template
          const section = box.closest('.section-quote_box');
          if (section) section.remove();
        }
      });
    }

    // Render testimonials
    testimonialsToShow.forEach((testimonial, index) => {
      if (carouselContainer) {
        // Homepage carousel
        const slide = document.createElement('div');
        slide.className = 'quote_box__slide';
        slide.innerHTML = `
          <h2 class="ic__heading h1 quote_box__heading">${escapeHtml(testimonial.title)}</h2>
          <div class="ic__description quote_box__description">
            <h5 class="h5">${escapeHtml(testimonial.copy)}</h5>
          </div>
          ${testimonial.attribution ? `<h4 class="ic__sub-heading quote_box__sub-heading">${escapeHtml(testimonial.attribution)}</h4>` : ''}
        `;
        carouselContainer.appendChild(slide);
      } else {
        // Testimonials page - create full quote box sections
        const container = document.querySelector('.page-content') || document.body;
        const section = document.createElement('div');
        section.className = 'section_' + (index + 7) + ' section-quote_box';
        section.setAttribute('data-id', 'quote_box_' + (index + 7));
        section.setAttribute('id', 'quote_box_' + (index + 7));
        section.innerHTML = `
          <section class="module quote_box__sec">
            <div class="quote_box">
              <div class="quote_box__inner container">
                <h2 class="ic__heading h1 quote_box__heading">${escapeHtml(testimonial.title)}</h2>
                <div class="ic__description quote_box__description">
                  <p>${escapeHtml(testimonial.copy)}</p>
                </div>
              </div>
              <div class="quote_box__bg green"></div>
              <img class="quote_box__shape quote_box__shape--top-right" src="wp-content/themes/medievalmile/dist/images/Pig.svg" alt="">
              <img class="quote_box__shape quote_box__shape--bottom-left" src="wp-content/themes/medievalmile/dist/images/Wolf.svg" alt="">
            </div>
          </section>
        `;
        container.appendChild(section);
      }
    });

    // Re-initialize slick carousel if on homepage
    if (carouselContainer && window.$ && $.fn.slick) {
      setTimeout(() => {
        const $slider = $(carouselContainer);
        if ($slider.hasClass('slick-initialized')) {
          $slider.slick('refresh');
        } else {
          // Slick will be initialized by homepage script
          console.log('Slick will be initialized by homepage script');
        }
      }, 100);
    }
  }

  // Utility function to escape HTML
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
})();
