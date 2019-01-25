const infoBoxesEl = document.querySelector('#info-boxes');
const shopsEl = document.querySelector('#shops');
const updateEl = document.querySelector('#update');

let lastData = null;

const f = () => fetch(`/static/shops.json?v=${Date.now()}`).then(res => res.text())
const b = () => fetch(`/static/infoBoxes.json?v=${Date.now()}`).then(res => res.text())

const drawShops = (data) => {
	shopsEl.innerHTML = data && data
		.map(shop => 
			`<tr><td>${shop.id}</td><td>${shop.shopType}</td><td><a target="blank" href="${shop.shopUrl}">${shop.shopUrl}</td></tr>`
		)
		.join('')

}

const drawInfoBoxes = (data) => {
	infoBoxesEl.innerHTML = data && data
		.map(box => 
			// `<tr><td>${box.title}</td><td>${box.boxTitle}</td><td>${box.descriptionHTML}</td><td>${box.buttons && box.buttons.map(t => `<a href="${t.url}">${t.title}</a>`).join('<br />')}</td></tr>`
			`<tr><td>${box.title}</td><td>${box.boxTitle}</td><td>${box.buttons && box.buttons.map(t => `<a target="_blank" href="${t.url}">${t.title}</a>`).join('<br />')}</td></tr>`
		)
		.join('')

}

async function updateShops() {
	const data = await f();
	if (lastData !== data) {
		drawShops(JSON.parse(data));
		lastData = data;
	} else {

	}
}

async function updateInfoBoxes() {
	const data = await b();
	if (lastData !== data) {
		drawInfoBoxes(JSON.parse(data));
		lastData = data;
	} else {

	}
}

setInterval(updateShops, 200);
setInterval(updateInfoBoxes, 200);