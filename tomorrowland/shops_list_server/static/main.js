const shopsEl = document.querySelector('#shops');
const updateEl = document.querySelector('#update');

let lastData = null;

const f = () => fetch(`/static/shops.json?v=${Date.now()}`).then(res => res.text())

const draw = (data) => {
	// updateEl.innerHTML = data.update;
	shopsEl.innerHTML = data && data
		.map(shop => 
			`<tr><td>${shop.id}</td><td>${shop.shopType}</td><td><a target="blank" href="${shop.shopUrl}">${shop.shopUrl}</td></tr>`
		)
		.join('')

}

async function update() {
	const data = await f();
	if (lastData !== data) {
		draw(JSON.parse(data));
		lastData = data;
	} else {

	}
}

setInterval(update, 200);