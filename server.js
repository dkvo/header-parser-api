const express = require('express');

const port = 3000 || process.env.PORT;
const app = express();
app.get('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});
app.get('/api/whoami', (req, res) => {
    console.log(req.ip);
    let resObject = {
        ipaddress: req.ip,
        language: req.get('accept-language'),
        software: req.get('user-agent')
    };
    console.log(resObject);
    res.status(200).send(JSON.stringify(resObject));
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})