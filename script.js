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

// Frontend - index.html
/*
<!DOCTYPE html>
<html>
<head>
    <title>Muttugly Appointment System</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body onload="fetchData()">
    <h1>Muttugly Grooming Appointments</h1>
    <input type="text" id="search" placeholder="Search by name" oninput="fetchData()">
    <input type="text" id="name" placeholder="Enter pet name">
    <input type="text" id="service" placeholder="Enter service type">
    <button onclick="addAppointment()">Add</button>
    <table id="appointmentTable">
        <thead>
            <tr>
                <th onclick="sortData('name')">Pet Name</th>
                <th onclick="sortData('service')">Service</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <script src="script.js"></script>
</body>
</html>
*/

// Frontend - styles.css
/*
body { font-family: Arial, sans-serif; padding: 20px; }
input, button { margin: 5px; padding: 8px; }
table { width: 100%; border-collapse: collapse; margin-top: 10px; }
th, td { border: 1px solid #ddd; padding: 8px; }
th { cursor: pointer; background: #f4f4f4; }
*/

// Frontend - script.js
/*
async function fetchData() {
    let res = await fetch('http://localhost:3000/appointments');
    let data = await res.json();
    let searchQuery = document.getElementById('search').value.toLowerCase();
    let tableBody = document.querySelector('#appointmentTable tbody');
    tableBody.innerHTML = '';
    data.filter(a => a.name.toLowerCase().includes(searchQuery))
        .forEach(a => {
            let row = `<tr>
                <td>${a.name}</td>
                <td>${a.service}</td>
                <td>
                    <button onclick="deleteAppointment(${a.id})">Delete</button>
                    <button onclick="editAppointment(${a.id})">Edit</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
}
async function addAppointment() {
    let name = document.getElementById('name').value;
    let service = document.getElementById('service').value;
    if (!name || !service) {
        alert('Both fields are required!');
        return;
    }
    await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Date.now(), name, service })
    });
    fetchData();
}
async function deleteAppointment(id) {
    await fetch(`http://localhost:3000/appointments/${id}`, { method: 'DELETE' });
    fetchData();
}
async function editAppointment(id) {
    let name = prompt('Enter new pet name:');
    let service = prompt('Enter new service:');
    if (!name || !service) return;
    await fetch(`http://localhost:3000/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, service })
    });
    fetchData();
}
function sortData(key) {
    fetchData().then(() => {
        let table = document.querySelector('#appointmentTable tbody');
        let rows = Array.from(table.rows);
        rows.sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText));
        table.innerHTML = '';
        rows.forEach(row => table.appendChild(row));
    });
}
fetchData();
*/
