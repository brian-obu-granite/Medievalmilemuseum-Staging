// Load testimonials from inline data and render them
(function() {
  // Testimonials data - single source of truth
  const testimonials = [
    {
      "id": 1,
      "title": "An Hour Well Spent",
      "copy": "I decided to do the guided tour based on reviews I read. And I'm so glad I did. My tour guide was Anna and not only was she extremely knowledgeable about Kilkenny's history, but you could tell she was genuinely interested and passionate about it, which made the tour even better. We spent an hour walking around various sites in the city and I left feeling like I had such a greater understanding and appreciation for this magnificent place.",
      "attribution": "Jaime, Washington"
    },
    {
      "id": 2,
      "title": "We Found the \"O\"!!🍀",
      "copy": "Florida Four really enjoyed John. He was so passionate and you could tell he Loved telling the history before we were even done purchasing our tickets for the self guided tour he had so much information. After we were finished and leaving we met him outside as he may have been coming back from break and he helped our friend find why the \"O\" was dropped in his name. We will be back again John Thank you. 💚🍀",
      "attribution": ""
    },
    {
      "id": 3,
      "title": "Amazing Tour of the Medieval Mile!",
      "copy": "I went on a guided tour with Joe and two other visitors, and had the most amazing time! I learnt lots about the history of the town, the medieval day to day life, and the individual streets and lanes. Price was extremely reasonable for the information I received! Joe answered all of my little nitpicky questions honestly and admitted what he didn't know, which made the experience feel earnest and human!",
      "attribution": ""
    },
    {
      "id": 4,
      "title": "Great Kilkenny Experience!",
      "copy": "Wonderful guide, very knowledgeable and friendly! Love the city of Kilkenny, it's history, shops and pubs! We toured the Medieval mile from St. Mary's church and museum, then the city on our own.",
      "attribution": ""
    },
    {
      "id": 5,
      "title": "Impressive History!",
      "copy": "A historically captivating experience. It has a lot of work to do to dig up more history but it is an impressive start. The self guided tour was good but we couldnt figure out the number order. We bounced all over. Still impressive. Highly recommend supporting this experience.",
      "attribution": ""
    },
    {
      "id": 6,
      "title": "Fabulous Tours with John!",
      "copy": "John was so entertaining and informative - we loved his tour! Actually, we did 2 tours with him; the outside Medieval Mile walking tour, AND the indoor museum tour. He is such an engaging and lively guide, full of fascinating information and stories that really bring medieval times alive. I highly recommend doing both tours!",
      "attribution": ""
    },
    {
      "id": 7,
      "title": "Must do for Kilkenny History…",
      "copy": "This was our first activity of our trip and did not disappoint. Our guide very charismatic and humorous while explaining the history and significance of the site.",
      "attribution": ""
    },
    {
      "id": 8,
      "title": "Informative and Entertaining!",
      "copy": "So much fun. Lynn was informative and entertaining. We really enjoyed ourselves and the weather was perfect. A definite must for those visiting Kilkenny.",
      "attribution": ""
    },
    {
      "id": 9,
      "title": "Brilliant and Worth Doing!",
      "copy": "Absolutely brilliant and interesting. An excellent starting point for anyone visiting Kilkenny. John the tour guide was fantastic. Thanks!",
      "attribution": ""
    },
    {
      "id": 10,
      "title": "A Must See Attraction!",
      "copy": "Absolutely fantastic museum! I would highly recommend visiting the Medieval Mile Museum and getting a guided tour as it is well worth it. The tour guide John, knows an abundance of knowledge about Kilkenny's culture and heritage. He totally brings the history to life which allows you to fully immerse yourself into the experience and the importance of this site. It was a brilliant experience and I couldn't recommend it enough! The gift shop also provides an opportunity to find very unique and reasonably priced items that are not found in other traditional Irish gift shops. I truly couldn't recommend this experience enough!!",
      "attribution": ""
    },
    {
      "id": 11,
      "title": "Epic!",
      "copy": "Amazing tour! An absolute must for a visit to Kilkenny. John was engaging and knowledgeable beyond belief. Highlight of my trip - thanks John!",
      "attribution": ""
    },
    {
      "id": 12,
      "title": "Medieval Mile Walking Tour",
      "copy": "We highly recommend this tour because we learned so much about the history of Kilkenny. Our tour Guide Anna was wonderful. It was a well spent hour, and the audio tour of the museum was very interesting.",
      "attribution": ""
    },
    {
      "id": 13,
      "title": "History Comes Alive",
      "copy": "My husband and I have been fortunate to travel fairly extensively, and we have been to many museums and engaged many guides. The guide here is absolutely top-shelf. He does what the best can do—engaging and educated, he imparts a wonderful big-picture perspective on what life was like then, and how much has changed (yet how much people have stayed the same). And for the rate of a museum admission it is an absolute bargain. Do yourself a favour, turn on your Google maps and find this place.",
      "attribution": ""
    },
    {
      "id": 14,
      "title": "Great Tour & Brilliant Guide Sharon",
      "copy": "Really Enjoyable Tour. Guide Sharon was fantastic & knowledgeable. Lots to see & learn about. Fully Recommend.",
      "attribution": ""
    }
  ];

  console.log('Testimonials data loaded:', testimonials.length, 'items');
  renderTestimonials(testimonials);

  function renderTestimonials(testimonials) {
    const carouselContainer = document.querySelector('.quote_box__slider');

    if (!carouselContainer) {
      console.error('Carousel container not found');
      return;
    }

    console.log('Rendering testimonials. Carousel container found.');

    // Determine which testimonials to show (first 4)
    const testimonialsToShow = testimonials.slice(0, 4);

    // Clear any existing slides
    const existingSlides = carouselContainer.querySelectorAll('.quote_box__slide');
    console.log('Existing slides to remove:', existingSlides.length);
    existingSlides.forEach(slide => slide.remove());

    // Render testimonials into carousel
    console.log('Adding', testimonialsToShow.length, 'testimonials to carousel');
    testimonialsToShow.forEach((testimonial, index) => {
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
      console.log('Added slide', index + 1, ':', testimonial.title);
    });

    // Re-initialize slick carousel if it exists
    if (window.$ && $.fn.slick) {
      setTimeout(() => {
        const $slider = $(carouselContainer);
        console.log('Slick initialized:', $slider.hasClass('slick-initialized'));

        if ($slider.hasClass('slick-initialized')) {
          console.log('Refreshing existing slick instance');
          $slider.slick('refresh');
        } else {
          console.log('Slick not yet initialized, waiting for page load scripts');
        }
      }, 100);
    } else {
      console.log('jQuery or Slick not available yet');
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
