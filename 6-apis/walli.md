---
parent: Apis
title: WALLI Wallpapers
nav_order: 1
---


### Images

```
curl
-H 'Host: ku.shanga.co'
-H 'OS: iOS'
-H 'Cache-response-version: 1557770401'
-H 'Accept: */*'
-H 'X-Sifter-Token: 26e38ade38e93ebd301773f221d4fffd4e6c049a'
-H 'Accept-Language: en-us'
-H 'User-Agent: Wallpapers/4 CFNetwork/976 Darwin/18.2.0'

'http://ku.shanga.co/api/v2/images/?page=3&sort=featured'
```


## Get all images
```javascript
// "sort": ["", "most", "featured", "recent"]
fetch('http://ku.shanga.co/api/v2/images/?page=3&sort=featured', {
	headers: {
		'X-Sifter-Token': '26e38ade38e93ebd301773f221d4fffd4e6c049a'
	}
}).then(res => res.json()).then(console.log)
```

## Get all categories
```javascript
fetch('http://ku.shanga.co/api/v2/images/getCategories/?lang=en&page=1&sort=position', {
	headers: {
		'X-Sifter-Token': '26e38ade38e93ebd301773f221d4fffd4e6c049a'
	}
}).then(res => res.json()).then(console.log)
```

## Get images by category
```javascript
fetch('http://ku.shanga.co/api/v2/images/getCategoryImages/?category_id=90&lang=en&page=1&sort=recent', {
	headers: {
		'X-Sifter-Token': '26e38ade38e93ebd301773f221d4fffd4e6c049a'
	}
}).then(res => res.json()).then(console.log)
```