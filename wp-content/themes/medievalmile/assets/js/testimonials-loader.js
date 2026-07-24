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

  // Testimonials unique to one of the 9 non-homepage/non-testimonials pages
  // that also embed the shared #quote_box_4 carousel component. Each of
  // these pages shows its own testimonial as slide 1, then fills the
  // remaining 3 slides from the homepage's own first 4 (see
  // getSlidesForPage below) - a value here (rather than a title string
  // referencing the master list above) means the content only exists on
  // that one page; a string means "reuse this exact master-list entry"
  // (its own testimonial happens to already be one of the 14).
  const PAGE_OWN_TESTIMONIAL = {
    'education': {
      "title": "Our tour guide was fantastic.",
      "copy": "We recently visited the Medieval Mile Museum on a class trip and were blown away! She pitched the tour at exactly the right level for the children and the information she provided was hugely interesting. The children loved learning about the Black Death, guessing at the origins of the artefacts and discussing the figures represented in the effigies. They enjoyed the thrill of crossing the glass panels set into the floors and are still talking about the tombs in the graveyard. The tour culminates in a Lego Hunt which gives the children the opportunity to race around in an effort to find all of the listed Lego characters. There wasn't a corner of the museum left unexplored by the class and the overall feeling at the end of the tour was one of high good humour. I highly recommend a visit to the Medieval Mile Museum. Thanks to all of the amazing and highly professional staff involved.",
      "attribution": "Ms. Mackey, Class Teacher"
    },
    'events-exhibitions': 'An Hour Well Spent',
    'explore': 'A Must See Attraction!',
    'venue-hire': {
      "title": "Perfect venue for April Sounds",
      "copy": "The Medieval Mile Museum was the perfect venue for April Sounds. The venue gave all in attendance a true Kilkenny welcome, immersing the audience into Kilkenny's culture and history while providing a beautiful setting for the artists to showcase their music. The sound was incredible. The outdoor space was ideal for pop up performances throughout the day too. Anne-Marie, Sarah, Grace and all the team at the museum were so helpful and accommodating from the lead up to and on the day of the concerts.",
      "attribution": "Andrea Keogh, Event Manager"
    },
    'medieval-mile-trail': {
      "title": "Highly recommended.",
      "copy": "We enjoyed our guided tour around St Mary's and Medieval Kilkenny so much. Our guide was so enthusiastic and knowledgeable - it revealed a different layer to the city that was always there.",
      "attribution": ""
    },
    'events': {
      "title": "Festival Director Kilkenny Tradfest",
      "copy": "Kilkenny Tradfest was thrilled to programme concerts with some of Ireland's most highly acclaimed traditional musicians and vocalists in the stunning Medieval Míle Museum. This historic landmark church, beautifully restored, provided a very special atmosphere and backdrop for both performers and audiences and added tremendously to the concert experience.",
      "attribution": "Marian Flannery"
    },
    'admission-opening-hours': 'Amazing Tour of the Medieval Mile!',
    'weddings': {
      "title": "Our Wedding",
      "copy": "Our sincerest thanks to the whole team in the Medieval Mile Museum for making our wedding day so special and memorable for all our guests. Chloë and I both knew that the museum would look incredible for our wedding ceremony. The way the space was able to be transformed for the day was stunning. The ceremony itself went so well. All of our guests have remarked how exceptional the ceremony was and how having it in a place with so much history was so extraordinary. We hope to visit the Museum again for many years to come and will have no hesitation in recommending you all to any friends and family who are getting married.",
      "attribution": "Chloë & Barry"
    },
    'guided-museum-tour': 'A Must See Attraction!'
  };

  console.log('Testimonials data loaded:', testimonials.length, 'items');

  // Homepage carousel (#quote_box_4) gets the default first-4 UNLESS this
  // is one of the 9 pages with their own testimonial slotted in as slide 1
  // - renderPageCarousel handles that case and returns true so the default
  // doesn't also run and get immediately overwritten.
  if (!renderPageCarousel(testimonials)) {
    renderCarousel(testimonials, testimonials.slice(0, 4));
  }

  // Testimonials page: full list, static (no carousel/arrows/dots/CTA)
  renderList(testimonials);

  // One of the 9 pages that embed the shared carousel component with their
  // own testimonial as slide 1 (see PAGE_OWN_TESTIMONIAL above). Detected
  // by matching the current path against each known page's own folder
  // name, same way the testimonials-page/homepage split already works.
  function renderPageCarousel(testimonials) {
    const path = window.location.pathname;
    const pageKey = Object.keys(PAGE_OWN_TESTIMONIAL).find(key => path.indexOf('/' + key + '/') !== -1 || path.indexOf('/' + key) === path.length - key.length - 1);
    if (!pageKey) {
      return false;
    }

    let ownTestimonial = PAGE_OWN_TESTIMONIAL[pageKey];
    if (typeof ownTestimonial === 'string') {
      ownTestimonial = testimonials.find(t => t.title === ownTestimonial);
    }
    if (!ownTestimonial) {
      return false;
    }

    const slides = getSlidesForPage(testimonials, ownTestimonial);
    renderCarousel(testimonials, slides);
    return true;
  }

  // Own testimonial first, then the homepage's own first 4, de-duplicated
  // by title (covers events-exhibitions/admission-opening-hours, whose own
  // testimonial already IS one of those 4), padding from the rest of the
  // master list if de-duping ever left fewer than 4.
  function getSlidesForPage(testimonials, ownTestimonial) {
    const seen = new Set();
    const slides = [];
    [ownTestimonial, ...testimonials.slice(0, 4)].forEach(t => {
      if (seen.has(t.title) || slides.length >= 4) { return; }
      seen.add(t.title);
      slides.push(t);
    });
    let i = 4;
    while (slides.length < 4 && i < testimonials.length) {
      const t = testimonials[i];
      if (!seen.has(t.title)) { seen.add(t.title); slides.push(t); }
      i++;
    }
    return slides;
  }

  function renderCarousel(testimonials, testimonialsToShow) {
    const carouselContainer = document.querySelector('.quote_box__slider');

    if (!carouselContainer) {
      return;
    }

    console.log('Rendering testimonials. Carousel container found.');

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

  // Testimonials page: same visual "quote_box" card as the homepage carousel
  // (decorative quote icon, Pig/Wolf art, heading, h5 copy, h4 attribution)
  // but every testimonial renders as its own static block - no slider, no
  // arrows/dots, no "More Testimonials" CTA (this page already IS the full
  // list). Uses the same plain .quote_box__heading (with site.css's generic,
  // unscoped .quote_box__heading:before icon) as the other 23 single-
  // testimonial quote_box instances site-wide, rather than the homepage
  // carousel's standalone .quote_box__quote-icon element - that element only
  // exists to dodge the carousel's variable slide-height clipping problem,
  // which doesn't apply here since each card's height is content-driven.
  function renderList(testimonials) {
    const listContainer = document.querySelector('.quote_box__list');

    if (!listContainer) {
      return;
    }

    console.log('Rendering full testimonials list:', testimonials.length, 'items');

    // Testimonials page lives one level down (/testimonials/), so shared
    // theme assets need the ../ prefix the homepage doesn't use.
    const assetPrefix = '../wp-content';

    listContainer.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
      const item = document.createElement('div');
      item.className = 'section-quote_box';
      item.innerHTML = `
        <section class="module quote_box__sec">
          <div class="quote_box">
            <div class="quote_box__inner container">
              <h2 class="ic__heading h1 quote_box__heading">${escapeHtml(testimonial.title)}</h2>
              <div class="ic__description quote_box__description">
                <h5 class="h5">${escapeHtml(testimonial.copy)}</h5>
              </div>
              ${testimonial.attribution ? `<h4 class="ic__sub-heading quote_box__sub-heading">${escapeHtml(testimonial.attribution)}</h4>` : ''}
            </div>
            <div class="quote_box__bg green"></div>
            <img class="quote_box__shape quote_box__shape--top-left" src="${assetPrefix}/themes/medievalmile/dist/images/Pig.svg" alt="">
            <img class="quote_box__shape quote_box__shape--bottom-right" src="${assetPrefix}/themes/medievalmile/dist/images/Wolf.svg" alt="">
          </div>
        </section>
      `;
      listContainer.appendChild(item);
      console.log('Added list item', index + 1, ':', testimonial.title);
    });
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
