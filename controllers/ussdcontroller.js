const menu = require('../ussd/menu');

exports.ussdHandler = (req, res) => {
  console.log('Received USSD Request:', req.body);
  menu.run(req.body, ussdResult => {
    res.set('Content-Type', 'text/plain');
    res.send(ussdResult);
  });
};
