const app = require('./app');

app.listen(app.get('port'), () => {
  console.log('Fireworks happening on port ', app.get('port'));
});