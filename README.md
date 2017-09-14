# Mongoose-query-vietnamese

Vietnamese is a language that is quite difficult to access and search. Because it uses multiple marks. I will guide you to a treatment tip with nodejs mongoose.

## Handle query keywork and debt settlement
```
//Using 'speakingurl' library: npm install speakingurl -save
const getSlug=require('speakingurl');
var sign = [];
sign[0] = ['uo', 'ươ', 'ướ', 'ườ', 'ừơ', 'ưở', 'ửơ', 'ữơ', 'ưỡ', 'ựơ', 'ượ']
sign[1] = ['a','à','á','ã','ả','â','ấ','ầ','ẫ','ẩ','ắ','ằ','ẵ','ẳ','ạ','ậ','ặ'];
sign[2] = ['e','é','è','ẻ','ẽ','ê','ế','ề','ể','ễ','ẹ','ệ'];
sign[3] =	['i','í','ì','ỉ','ĩ','ị'];
sign[4] =	['o','ó','ò','ỏ','õ','ô','ố','ồ','ổ','ỗ','ơ','ớ','ờ','ở','ỡ','ọ','ộ','ợ'];
sign[5] =	['u','ù','ú','ủ','ũ','ư','ứ','ừ','ử','ữ','ụ','ự'];
sign[6] =	['y','ý','ỳ','ỷ','ỹ','ỵ'];

//Function will change sign keyword and return a array keyword with sign
function changeSign(str){
	var result = [String];
	result.push(str);
	if ( str.indexOf('uo') >= 0 ) {
		for (var i = 0; i < sign[0].length; i++) {
			var newWord = str;
			newWord = newWord.replace('uo', sign[0][i]);
			result.push(newWord);
		}
	}
	console.log(str);
	for (var i = 0; i < str.length; i++) {
		for (var j = 1; j < 7; j++) {
			if (str[i] == sign[j][0]) {
				for (var k = 1; k < sign[j].length; k++) {
					var newWord = str;
					newWord = newWord.replace(str[i],sign[j][k]);
					result.push(newWord);
				};
			};
		};
	};
	return result;
};

//Function separated into an independent word in string keyword
function processkeywordQuery(str){
	var key = [];
	while ( str.indexOf(" ") >= 0 ) {
		var word = getSlug(str.slice(0, str.indexOf(" ")));
		var result = changeSign(word);
		for (var i = 0; i < result.length; i++) {
			key.push(result[i]);
		}
		str = str.slice(str.indexOf(" ") + 1, str.length);
	};
	var result = changeSign(getSlug(str));
	for (var i = 0; i < result.length; i++) {
		key.push(result[i]);
	}
	return key;	
}

```

## Query by mongoose 
After you using 2 function, you can recieve a array keyword has been processed.
Now you using query mongoose and .map of array find data
Example using:
```
var keyword = handling.processTagQuery(req.query.keyword);
	var page = handling.processPageQuery(req.query.page);
	var type = handling.processTypeQuery(req.query.type);
	Trip.find()
	.or([
		{$and: [
			{'title':{$in: keyword.map(function(str){
							var key = new RegExp(str,'i');
							return key;
						})
					}
			},
			{'type': {
				$in: type.map(function(num){
					return num;
				})
			}}
		]},
		{$and: [
			{'start.name':{$in: keyword.map(function(str){
							var key = new RegExp(str,'i');
							return key;
						})
					}
			},
			{'type': {
				$in: type.map(function(num){
					return num;
				})
			}}
		]},
		{$and: [
			{'end.name':{$in: keyword.map(function(str){
							var key = new RegExp(str,'i');
							return key;
						})
					}
			},
			{'type': {
				$in: type.map(function(num){
					return num;
				})
			}}
		]}
	])
	.sort({'money.value': 1})
	.exec(function(err, trip){
		var result = {
			error: false,
			trip: []
		};
		if (err) result.error = true;
		if (trip.length > 0) {
			var tripResult = handling.getChildArray(trip, page, 'trip');
			if (tripResult.length > 0) {
				result.trip = tripResult;
			}else{
				result.error = true;
			}
		}else{
			result.error = true;
		}
		res.json(result);
	});
```

Trick Mongoose:
If you have more factor search you should use .or  $and ,....  like this :
```
Trip.find()
	.or([
		{$and: [
			{'title':{$in: keyword.map(function(str){
							var key = new RegExp(str,'i');
							return key;
						})
					}
			},
			{'type': {
				$in: type.map(function(num){
					return num;
				})
			}}
		]},
		{$and: [
			{'start.name':{$in: keyword.map(function(str){
							var key = new RegExp(str,'i');
							return key;
						})
					}
			},
			{'type': {
				$in: type.map(function(num){
					return num;
				})
			}}
		]},
		{$and: [
			{'end.name':{$in: keyword.map(function(str){
							var key = new RegExp(str,'i');
							return key;
						})
					}
			},
			{'type': {
				$in: type.map(function(num){
					return num;
				})
			}}
		]}
	])
```

If you have question email to me : cptrodgers@gmail.com.  
If you have problem with query VietNamese contact me. I can help you.
I am completing the search module Vietnamese and sends up early npm. Thank you
