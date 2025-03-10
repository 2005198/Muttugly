const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

const dataFile = 'data.json';
let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// CRUD API for Appointments
app.get('/appointments', (req, res) => res.json(data));
app.post('/appointments', (req, res) => {
    data.push(req.body);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.status(201).json(req.body);
});
app.put('/appointments/:id', (req, res) => {
    let index = data.findIndex(item => item.id == req.params.id);
    if (index !== -1) {
        data[index] = req.body;
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        res.json(req.body);
    } else {
        res.status(404).send('Appointment not found');
    }
});
app.delete('/appointments/:id', (req, res) => {
    data = data.filter(item => item.id != req.params.id);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.status(204).send();
});
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
