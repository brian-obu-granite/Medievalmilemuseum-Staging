// Shared category-tabs + month-dropdown filter for card grids (What's On,
// Blog). One script instantiated per .content-filter root found on the
// page - each root declares its own grid/item selectors via data
// attributes so the same code drives different markup (.cg__item cards,
// .ln__item blog posts) without duplicating the filtering logic per page.
(function () {
	function parseDates(str) {
		if (!str) { return []; }
		return str.split(',')
			.map(function (s) { return s.trim(); })
			.filter(Boolean)
			.map(function (s) { return new Date(s + 'T00:00:00'); })
			.filter(function (d) { return !isNaN(d.getTime()); });
	}

	function monthKey(date) {
		var month = date.getMonth() + 1;
		return date.getFullYear() + '-' + (month < 10 ? '0' + month : month);
	}

	function monthLabel(key) {
		var parts = key.split('-');
		var date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
		return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
	}

	function startOfToday() {
		var d = new Date();
		d.setHours(0, 0, 0, 0);
		return d;
	}

	function initFilter(root) {
		var grid = document.querySelector(root.getAttribute('data-filter-grid'));
		if (!grid) { return; }
		var itemSelector = root.getAttribute('data-filter-item');
		var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-filter-tab]'));
		var monthSelect = root.querySelector('.content-filter__month-select');
		var today = startOfToday();

		var items = Array.prototype.slice.call(grid.querySelectorAll(itemSelector)).map(function (el) {
			return {
				el: el,
				dates: parseDates(el.getAttribute('data-dates')),
				featured: el.getAttribute('data-featured') === 'true'
			};
		});

		// Month options are derived from whatever dates actually appear on
		// the page's cards, not a fixed list - so the dropdown never shows
		// a month with nothing in it, and never needs manual upkeep as
		// events/posts are added or removed.
		if (monthSelect) {
			var monthsPresent = {};
			items.forEach(function (item) {
				item.dates.forEach(function (date) {
					monthsPresent[monthKey(date)] = true;
				});
			});
			Object.keys(monthsPresent).sort().forEach(function (key) {
				var option = document.createElement('option');
				option.value = key;
				option.textContent = monthLabel(key);
				monthSelect.appendChild(option);
			});
		}

		var activeTab = 'all';
		var activeMonth = '';

		// Upcoming/Past are evaluated against the SAME date(s) the month
		// filter narrows to, not independently of it - e.g. "Upcoming" +
		// "July" for a recurring event with passed July dates but future
		// August/September dates must NOT match: it has no upcoming
		// occurrence in July specifically, even though the event overall
		// still counts as upcoming. Restricting to the active month first,
		// then checking the tab rule only against what's left, keeps every
		// tab's meaning scoped to "in that month" rather than "at all".
		function relevantDates(item) {
			if (!activeMonth) { return item.dates; }
			return item.dates.filter(function (date) { return monthKey(date) === activeMonth; });
		}

		function matches(item) {
			var dates = relevantDates(item);
			if (activeMonth && dates.length === 0) { return false; }
			if (activeTab === 'all') { return true; }
			if (activeTab === 'featured') { return item.featured; }
			if (activeTab === 'upcoming') {
				return dates.some(function (date) { return date >= today; });
			}
			if (activeTab === 'past') {
				return dates.length > 0 && dates.every(function (date) { return date < today; });
			}
			return true;
		}

		function render() {
			items.forEach(function (item) {
				item.el.style.display = matches(item) ? '' : 'none';
			});
		}

		tabs.forEach(function (tab) {
			tab.addEventListener('click', function () {
				tabs.forEach(function (t) {
					t.classList.remove('is-active');
					t.setAttribute('aria-selected', 'false');
				});
				tab.classList.add('is-active');
				tab.setAttribute('aria-selected', 'true');
				activeTab = tab.getAttribute('data-filter-tab');
				render();
			});
		});

		if (monthSelect) {
			monthSelect.addEventListener('change', function () {
				activeMonth = monthSelect.value;
				render();
			});
		}

		render();
	}

	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(document.querySelectorAll('.content-filter'), initFilter);
	});
})();
