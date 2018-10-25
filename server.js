const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
app.get('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});
app.get('/api/whoami', (req, res) => {
    var resObject = {
        ipaddress: '',
        language: req.get('accept-language'),
        software: req.get('user-agent')
    };
    var ip = req.get('x-forwarded-for');
    if(ip) {
        const arr =  ip.split(',');
        resObject.ipaddress = arr[arr.length - 1];
    }
    res.status(200).send(JSON.stringify(resObject));
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})