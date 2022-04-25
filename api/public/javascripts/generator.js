function generate(length, capital, number, symbol) {
    var charNumber = "0123456789";
    var charCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charSymbol = "!@#$%^&*()";
    var charPool = "abcdefghijklmnopqrstuvwxyz";

    if (capital == "true") { charPool += charCapital }
    if (number == "true") { charPool += charNumber }
    if (symbol == "true") { charPool += charSymbol }

    var password = "";
    for (var i = 0; i <= length - 1; i++) {
        var randomNumber = Math.floor(Math.random() * charPool.length);
        password += charPool.substring(randomNumber, randomNumber + 1);
    }
    console.log(password)
    return password;
}

module.exports = { generate };