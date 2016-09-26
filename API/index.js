var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtp://web25423253:dI0pdMoo@alfa3201.alfahosting-server.de');
var options = {
  host: 'alfa3201.alfahosting-server.de',
  port: 465,
  secure: false,
  auth: {
      user: 'web25423253',
      pass: 'dI0pdMoo'
  },
  tls: {
      rejectUnauthorized: false
  }
}

var transporter = nodemailer.createTransport(options);

app.post('/mondo', function (req, res) {

  // console.log(req.body);

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 's.martinovic@hrs-medical.com', // sender address
      to: 'vildantursic@hotmail.com',
      subject: 'Mondo IT',
      text: 'something'
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.error(error);
      }
      res.json('Message sent: ' + info.response);
      console.log('Message sent: ' + info.response);
  });
});

app.listen(3001, function () {
  console.log('Mail service listening on port 3001');
});
