const express = require('express');

const app = express();
const x = 'hello';

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

app.get('/', (req, res) => {
  res.send('hello');
});

const obj = {
  hello: function () {
    console.log('hello');
  },
}; // * jnjn * //
obj.value = x;

console.log(obj);
