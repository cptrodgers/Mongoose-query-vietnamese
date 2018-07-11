# Vietnamese Slug For query same iLike in mongoose:

## Install:

```bash
npm insatll vietnamese-query --save
```

## Use with mongoose (same ilike):

```javascript
const vietnamese = require('vietnamese-query')

// Asume we have model User of mongoose
User.find({'fullName': vietnamese.iLikeVietnamese(str)}).exec((err, users) => {
	// Handle users here
})
```

## Use with split funtion:

``` javascript
const splitVienamese = require('vietnamese-query').splitVienamese
const keys = splitVienamese(request.query.q)
// keys will list with sign of Vietnam
User.find({'fullName': {$in: keys.map((key) => new RegExp(key, 'i')) }}).exec((err, users) => {
	// Do here
})
```

## Todo:

+ Implement demo
+ Implement standard js
+ Implement test
