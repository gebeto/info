---
parent: How To
title: Apple photos
nav_order: 1
---


# How to get all apple shop images

```
https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/H/LZ/HLZ42/HLZ42
```

brutforce it with 5 `ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`, it is 60 millions images



## Generate HTML files
```python
def file_for_letter(letter):
	res = """<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>"""
	for j in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890':
		for k in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890':
			for l in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890':
				for m in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890':
					res += '\n<img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/{0}/{1}{2}/{0}{1}{2}{3}{4}/{0}{1}{2}{3}{4}">'.format(letter, j, k, l, m)
	res += """
	</body>
	</html>"""
	open("files/{}.html".format(letter), "w").write(res)

for i in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890':
	file_for_letter(i)
```