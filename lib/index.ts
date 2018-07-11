const getSlug = require('speakingurl')


// Prepare sign for vietnameses
const sign: string[][] = []
sign[0] = ['uo', 'ươ', 'ướ', 'ườ', 'ừơ', 'ưở', 'ửơ', 'ữơ', 'ưỡ', 'ựơ', 'ượ']
sign[1] = ['a', 'à', 'á', 'ã', 'ả', 'â', 'ấ', 'ầ', 'ẫ', 'ẩ', 'ắ', 'ằ', 'ẵ', 'ẳ', 'ạ', 'ậ', 'ặ']
sign[2] = ['e', 'é', 'è', 'ẻ', 'ẽ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ẹ', 'ệ']
sign[3] = ['i', 'í', 'ì', 'ỉ', 'ĩ', 'ị']
sign[4] = ['o', 'ó', 'ò', 'ỏ', 'õ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ọ', 'ộ', 'ợ']
sign[5] = ['u', 'ù', 'ú', 'ủ', 'ũ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ụ', 'ự']
sign[6] = ['y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ']


export function slugVienamese(str: string): string[] {
    const keys: string[] = []
    while (str.indexOf(" ") >= 0) {
        var word = getSlug(str.slice(0, str.indexOf(" ")))
        var result = changeSign(word)
        for (var i = 0; i < result.length; i++) {
            keys.push(result[i]);
        }
        str = str.slice(str.indexOf(" ") + 1, str.length)
    }
    var result = changeSign(getSlug(str));
    for (var i = 0; i < result.length; i++) {
        keys.push(result[i])
    }
    return keys
}

export function iLikeVietnamese(str: string): any {
    return { $in: slugVienamese(str).map((key) => new RegExp(key, 'i')) }
}


//Function will change sign keyword and return a array keyword with sign
function changeSign(str: string) {
    var result: string[]  = [];
    result.push(str)
    if (str.indexOf('uo') >= 0) {
        for (var i = 0; i < sign[0].length; i++) {
            var newWord = str
            newWord = newWord.replace('uo', sign[0][i])
            result.push(newWord)
        }
    }
    for (var i = 0; i < str.length; i++) {
        for (var j = 1; j < 7; j++) {
            if (str[i] == sign[j][0]) {
                for (var k = 1; k < sign[j].length; k++) {
                    var newWord = str
                    newWord = newWord.replace(str[i], sign[j][k])
                    result.push(newWord)
                }
            }
        }
    }
    return result
}
