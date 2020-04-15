# Silpo

## API for shop.silpo.ua


Search items:

```javascript
// Fetch
fetch("https://api.catalog.ecom.silpo.ua/api/2.0/exec/EcomCatalogGlobal", {
	"method": "POST",
	"headers": {
		"content-type": "application/json;charset=UTF-8",
	},
	"body": JSON.stringify({
		"method": "GetSimpleCatalogItems",
		"data": {
			"customFilter": "Курка",
			"filialId": "2405",
			"skuPerPage": 100,
			"pageNumber": 1
		}
	}),
}).then(res => res.json()).then(console.log);
```

```sh
# Fetch by curl
curl 'https://api.catalog.ecom.silpo.ua/api/2.0/exec/EcomCatalogGlobal'\
	-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'\
	-H 'Content-Type: application/json;charset=UTF-8'\
	--data-binary '
			{
				"method": "GetSimpleCatalogItems",
				"data": {
					"customFilter": "Курка",
					"filialId": "2405",
					"skuPerPage": 5,
					"pageNumber": 1
				}
			}
	'
```