var items = [...document.querySelectorAll('.Box-row')];

items.map((item, index) => {
	// var item = items[0];
	var a = item.querySelector('a');
	var href = a.href;
	setTimeout(() => {
		mergeRequest(href);
	}, index * 5000);
});






function mergeRequest(href) {
	var win = window.open(href);

	setTimeout(function merging() {
		var doc = win.document;
		var merge = doc.querySelector('[data-details-container=".js-merge-pr"]');
		if (merge) {
			merge.click();
			setTimeout(function submitMerging() {
				var submitMerge = doc.querySelector('[data-disable-with="Merging…"]');
				if (submitMerge) {
					submitMerge.click()
				} else {
					setTimeout(submitMerging, 300);
				}
			}, 300);
		} else {
			setTimeout(merging, 1000)
		}
	}, 1000);
}

