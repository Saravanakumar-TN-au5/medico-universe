const mongoose = require('mongoose');
const hospitalmodel = require('../model/hospitalmodels');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: 'f18fac96',
    apiSecret: 'lQWUWc5wcKjXvT7M',
});

// const news = require('../data/news.json');
// const dharwad = require('../data/dharwad.json')

var hospitalcontroller = {};
hospitalcontroller.hospital = function (req, res) {
    // hospitalmodel.news.find().then(function (err, data) {
    //     res.send(data)
    // });
    res.render('./hospital.hbs');
}
hospitalcontroller.db = function (req, res) {
    hospitalcontroller.arr = [];
    hospitalmodel.mysuru.find().then(function (data) {
        hospitalcontroller.arr.push(...data);
    });
    hospitalmodel.banglore.find().then(function (data) {
        hospitalcontroller.arr.push(...data);
    });
    hospitalmodel.belagavi.find().then(function (data) {
        hospitalcontroller.arr.push(...data);
    });
    hospitalmodel.dharwad.find().then(function (data) {
        hospitalcontroller.arr.push(...data);
        res.send(hospitalcontroller.arr);
    });
}
hospitalcontroller.storeddata = function (req, res) {
    var searched = req.body.searchbox
    var details = [];
    hospitalmodel.mysuru.find().then(function (data) {
        details.push(...data);
    });
    hospitalmodel.banglore.find().then(function (data) {
        details.push(...data);
    });
    hospitalmodel.belagavi.find().then(function (data) {
        details.push(...data);
    });
    hospitalmodel.dharwad.find().then(function (data) {
        details.push(...data);
        details.forEach(el => {
            if (searched == el.hname) {
                res.render('hospital.hbs', {
                    longitude: el.longitude,
                    latitude: el.latitude,
                    hname: el.hname,
                    address: el.address,
                    pincode: el.pincode,
                    phoneNumber: el.phoneNumber
                })
            }
        });
    });
}
hospitalcontroller.patientdata = function (req, res) {
    var obj = {
        patient: req.body.patientname,
        age: req.body.patientage,
        problem: req.body.patientproblem,
        no: req.body.no
    }
    const from = 'MedicoUniverse';
    const to = obj.no;
    const text = 'Your '+obj.problem+' problem is noted please visit our hospital we are here to help';
    nexmo.message.sendSms(from, to, text);
    res.render('thankyou.hbs', {
        obj: obj
    })
}
// hospitalcontroller.atlas = function(req,res){
//     mongoose.model('news').insertMany(news, function(err, results){
//         console.log('Data Saved successfully into the database')
//         res.send(news);
//     });
// }
module.exports = hospitalcontroller