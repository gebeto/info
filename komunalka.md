# Komunalka

| Тип					  | Номер			 | Посилання															   | Ключ                 |
|:-----------------------:|:----------------:|:-----------------------------------------------------------------------:|:--------------------:|
| Львівгаззбут			  | 0900503566	     | [EasyPay](https://easypay.ua/catalog/utility/lvov/lvovgaz)              | LVOVGAZ              |
| Львівводоканал		  | 8239870710	     | [EasyPay](https://easypay.ua/catalog/utility/lvov/vodokanal-lvov)       | VODOKANAL-LVOV       |
| Львівенергозбут		  | 1800550537	     | [EasyPay](https://easypay.ua/catalog/utility/lvov/lvovoblenergo)        | LVOVOBLENERGO        |
| Укртелеком			  | 4600000020436017 | [EasyPay](https://easypay.ua/catalog/mobile/ukrtelecom)                 | UKRTELECOM           |
| Залізничне теплоенергія | 3200010903	     | [EasyPay](https://easypay.ua/catalog/utility/lvov/communal-lvov-merger) | COMMUNAL-LVOV-MERGER |
| Сигнівка Комуналка	  | 3050197027	     | [EasyPay](https://easypay.ua/catalog/utility/lvov/communal-lvov-merger) | COMMUNAL-LVOV-MERGER |


<script>

function getInitData() {
	return fetch("https://api.easypay.ua/api/system/createPage", {
		"headers": {
			"accept": "application/json, text/plain, */*",
			"appid": "e18ecdba-b592-4cba-bb3b-48486b0bfe49",
			"content-type": "application/json; charset=UTF-8",
			"partnerkey": "easypay-v2",
		},
		"body": null,
		"method": "POST",
	}).then(res => res.json());
}

async function getServiceData(initData, serviceKey, accountNumber) {
	const json = await fetch("https://api.easypay.ua/api/genericCommunalFlow/check", {
		"headers": {
			"accept":"application/json, text/plain, */*",
			// "appid":"e18ecdba-b592-4cba-bb3b-48486b0bfe49",
			"appid": initData.appId,
			"content-type":"application/json; charset=UTF-8",
			// "pageid":"5e550c19-5618-4821-a46e-4282b71bacb1",
			"pageid": initData.pageId,
			"partnerkey":"easypay-v2",
		},
		"body": JSON.stringify({
			"fields": [
				{
					"fieldName": "Account",
					"fieldValue": accountNumber
				}
			],
			"serviceKey":serviceKey,
			"amount":null,
			"multyCheckPaymentStepIndex":0,
		}),
		"method":"POST",
	}).then(res => res.json());

	return {
		accountInfo: json.accountInfo,
		products: json.products,
	}
}


getInitData().then(async (initData) => {
	const table = document.querySelector('table');

	getServiceData(initData, "LVOVGAZ", "0900503566").then(console.log);
	getServiceData(initData, "VODOKANAL-LVOV", "8239870710").then(console.log);
	getServiceData(initData, "LVOVOBLENERGO", "1800550537").then(console.log);
})

</script>
