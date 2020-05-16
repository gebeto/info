const myLink = prompt("Enter your link")
const redirectLink = "https://my.tomorrowland.com/shop/worldwidepresale"

const ignore = [];

const check = () => fetch(`https://scale.fallback.tomorrowland.com/wwpresale.json?${Date.now()}`)
	.then(r => r.text())
	.then(res => {
		console.log(res);
		// if (res.lenth > 2 && ignore.includes(res)) {
		if (!ignore.includes(res)) {
			ignore.push(res);
			window.open(redirectLink);
		}
		check();
	});
check();