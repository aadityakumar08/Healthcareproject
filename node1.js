var exp = require('express');
var obj = exp();
var body1 = require('body-parser');
var encoded = body1.urlencoded({ extended: false });

obj.get('/form', (req, res) => {
    res.sendFile(__dirname + "/form.html");
});

obj.post('/formprocess', encoded, (req, res) => {
    res.send({
        firstname: req.body.patientName,
        doctor: req.body.doctor,
        Date: req.body.date
    });
});

obj.listen(3000, () => {
    console.log("running");
});

