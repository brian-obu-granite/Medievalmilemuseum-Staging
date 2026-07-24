// Shared Slick carousel init for every .quote_box__slider instance
// site-wide (homepage + the 9 pages that embed the same #quote_box_4
// testimonial carousel component). One script, loaded by every page that
// has the markup, rather than duplicating this logic per page - a change
// here reaches every instance automatically, same as the shared CSS.
(function () {
	function fixQuoteSliderPosition() {
		if (!window.jQuery) { return; }
		var $ = window.jQuery;
		var $quoteSlider = $('.quote_box__slider');
		if ($quoteSlider.hasClass('slick-initialized')) { $quoteSlider.slick('setPosition'); }
	}
	// variableWidth slick sliders measure slide widths at init time; if the
	// site's custom @font-face fonts, images, or a delayed init (e.g. WP
	// Rocket's "delay JS execution" deferring the slick init script itself
	// until first user interaction) haven't settled yet, those measurements
	// (and the resulting track transform) are wrong and never self-correct,
	// which is why a manual refresh (everything already cached/settled) "fixes" it.
	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(fixQuoteSliderPosition);
	}
	if (document.readyState === 'complete') {
		fixQuoteSliderPosition();
	} else {
		window.addEventListener('load', fixQuoteSliderPosition);
	}
	// Belt-and-suspenders: watch the slider itself for ANY size change, so we
	// catch cases the two triggers above miss (e.g. slick's own init being
	// delayed past window.load, or a width change from something unrelated).
	var quoteSliderEl = document.querySelector('.quote_box__slider');
	if (quoteSliderEl && window.ResizeObserver) {
		var lastQuoteWidth = 0;
		var qro = new ResizeObserver(function (entries) {
			var w = entries[0].contentRect.width;
			if (Math.abs(w - lastQuoteWidth) > 1) {
				lastQuoteWidth = w;
				fixQuoteSliderPosition();
			}
		});
		qro.observe(quoteSliderEl);
	}
})();
(function () {
	// prevArrow/nextArrow/appendDots point at buttons/containers already
	// in the markup (same technique the card slider's own config uses)
	// rather than letting slick generate its own default ones, so the
	// existing custom arrow/dot styling applies with no extra CSS.
	function initQuoteSlider() {
		if (!window.jQuery || typeof window.jQuery.fn.slick !== 'function') { return false; }
		var $ = window.jQuery;
		var $slider = $('.quote_box__slider');
		if (!$slider.length || $slider.hasClass('slick-initialized')) { return true; }
		$slider.slick({
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			fade: true,
			cssEase: 'linear',
			dots: true,
			arrows: true,
			prevArrow: $('.quote_box__controls-arrow .slick-prev'),
			nextArrow: $('.quote_box__controls-arrow .slick-next'),
			appendDots: $('.quote_box__controls-dots')
		});
		// slick measures .slick-list's width once, synchronously, right
		// here, and bakes the result into an inline width on the track/
		// slides - if this stylesheet hasn't finished applying yet at that
		// exact moment (this init already runs later/less predictably than
		// a plain parse-time call - that's the whole reason for the retry
		// loop below), slick measures against the pre-fix (wider,
		// content-driven) layout and that wrong width sticks, since an
		// inline style always wins over the stylesheet arriving after it.
		// Unlike fixQuoteSliderPosition above (which only re-triggers when
		// the slider's own size later CHANGES), the container here never
		// changes size - only slick's one-time measurement was wrong - so
		// forcing a couple of re-measures shortly after init is the
		// reliable fix, not waiting on an event that may never fire again.
		setTimeout(function () { $slider.slick('setPosition'); }, 50);
		setTimeout(function () { $slider.slick('setPosition'); }, 500);
		return true;
	}
	// jQuery/slick aren't guaranteed to be attached to window at the exact
	// moment this deferred script runs - retry on a short interval rather
	// than assuming a single synchronous check is enough, the same
	// defensive approach as the position-fix script above (which itself
	// exists because load-order timing here isn't always what a plain
	// defer/DOMContentLoaded model would suggest).
	if (initQuoteSlider()) { return; }
	var attempts = 0;
	var retry = setInterval(function () {
		attempts++;
		if (initQuoteSlider() || attempts > 50) { clearInterval(retry); }
	}, 100);
})();
