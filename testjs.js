var algorithmia = require("algorithmia");
var key = "qwertysimGjfAtpOddBkkywDE95UTIXcB1123"

// Very minor "masking" for now - env thing not working
var client = algorithmia(key.slice(6,(key.length-3)));

var input = {
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Monroecirca1953.jpg",
    "numResults": 7
}

client.algo("algo://deeplearning/EmotionRecognitionCNNMBP/0.1.2")
      .pipe(input)
      .then(function(response) {
        console.log(response.get());
      });
