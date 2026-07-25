// Smooth-scrolls the "Contact Us"/"Get in Touch" CTAs on this page down to
// the on-page contact form section (#two_column_content_2) instead of
// navigating to it. Jumps straight there with no animation at all for
// visitors with prefers-reduced-motion: reduce set (see the bottom of this
// file) - WCAG 2.3.3, and simply the considerate thing to do for anyone
// who's told their OS they get motion-sick from exactly this kind of
// large, fast scroll.
//
// The CTAs deliberately do NOT use a real "#two_column_content_2" href
// (a data-scroll-target attribute carries the id instead) - every attempt
// at a real fragment href kept fighting this script: even with
// preventDefault() called, some part of the browser's own handling of a
// click on an <a href="#id"> still re-applied its own "jump to fragment"
// during/after this animation, landing short of the offset target or
// (once other page content finished loading) drifting further down well
// after this animation had already finished. Removing the real fragment
// href removes that competing behavior entirely, rather than trying to
// out-race it.
//
// This drives the scroll manually with its own requestAnimationFrame loop
// rather than Element.scrollIntoView({behavior:'smooth'}) or CSS
// scroll-behavior:smooth, for two reasons:
//   1. Neither native API exposes a speed/duration control, and this needs
//      to run at a specific, deliberately-slower-than-default pace.
//   2. The target's position is re-measured every frame rather than once
//      up front: if images below the fold (there are several large ones
//      on both pages) are still loading when the CTA is clicked, the page
//      is shorter than its final layout and a one-shot measurement lands
//      short of the real section. Re-measuring each frame means the
//      animation keeps converging on the section's actual position even
//      if the page keeps growing underneath it mid-scroll.
(function () {
  var DURATION = 1161; // ms - 1103ms slowed down 5% (duration / 0.95)

  // Linear for most of the motion, decelerating smoothly into the final
  // position instead of stopping abruptly - full speed at t=0, easing off
  // as t approaches 1.
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function getTargetScrollY(target) {
    var rect = target.getBoundingClientRect();
    var scrollMarginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    return window.scrollY + rect.top - scrollMarginTop;
  }

  function animateScrollTo(target) {
    var startY = window.scrollY;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) { startTime = timestamp; }
      var progress = Math.min((timestamp - startTime) / DURATION, 1);
      var targetY = getTargetScrollY(target);
      // behavior: 'instant' explicitly overrides the site's global
      // scroll-behavior:smooth (brand-redesign.css, added for plain
      // anchor links elsewhere) - without it, the browser was applying
      // its own native easing on top of every one of these per-frame
      // calls, doubly-smoothing an already-animated value and making the
      // result feel eased rather than linear despite the math above.
      window.scrollTo({ top: startY + (targetY - startY) * easeOutCubic(progress), left: 0, behavior: 'instant' });
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // WCAG 2.3.3 (Animation from Interactions): users with vestibular
  // disorders or motion sensitivity can turn this off at the OS level:
  // respect that instead of forcing the animation on everyone regardless
  // of what they've asked their device to do.
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-scroll-target]');
    if (!link) { return; }
    var target = document.getElementById(link.getAttribute('data-scroll-target'));
    if (!target) { return; }
    e.preventDefault();
    if (prefersReducedMotion()) {
      window.scrollTo({ top: getTargetScrollY(target), left: 0, behavior: 'instant' });
      return;
    }
    animateScrollTo(target);
  }, true);
})();
