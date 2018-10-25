const os = require('os');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});
app.get('/api/whoami', (req, res) => {
    const interfaces = os.networkInterfaces();
    var ipAddress;
    for(var i in interfaces) {
        for(var k in interfaces[i]) {
            if(interfaces[i][k].family == 'IPv4' && !interfaces[i][k].internal) {
                ipAddress = interfaces[i][k].address;
            }
        }
    }
    console.log(ipAddress);
    var resObject = {
        ipAddress,
        language: req.get('accept-language'),
        software: req.get('user-agent')
    };
    res.status(200).send(JSON.stringify(resObject));
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})