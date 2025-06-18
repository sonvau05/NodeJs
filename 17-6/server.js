const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

function writeLog(message, status = 'SUCCESS', details = {}) {
    const timestamp = new Date().toISOString();
    const logMessage = { timestamp, status, message, details };
    const logFile = path.join(logDir, `log-${timestamp.split('T')[0]}.txt`);
    fs.appendFileSync(logFile, JSON.stringify(logMessage) + '\n');
}

app.use(express.json());
app.use((req, res, next) => {
    writeLog(`Request: ${req.method} ${req.url}`, 'INFO', { ip: req.ip, headers: req.headers, body: req.body });
    next();
});

let cars = [];
let nextId = 1;

app.post('/api/cars', (req, res) => {
    try {
        const { brand, model, year, price } = req.body;
        if (!brand || !model || !year || !price) {
            writeLog('Create car failed: Missing fields', 'ERROR', req.body);
            return res.status(400).json({ error: 'Missing fields: brand, model, year, price' });
        }
        const car = { id: nextId++, brand, model, year, price, createdAt: new Date().toISOString() };
        cars.push(car);
        writeLog('Car created', 'SUCCESS', car);
        res.status(201).json({ message: 'Car created', data: car });
    } catch (error) {
        writeLog('Create car error', 'ERROR', { error: error.message });
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/cars', (req, res) => {
    try {
        writeLog('Get all cars', 'SUCCESS', { count: cars.length });
        res.json({ message: 'Cars retrieved', data: cars });
    } catch (error) {
        writeLog('Get cars error', 'ERROR', { error: error.message });
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/cars/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const car = cars.find(c => c.id === id);
        if (!car) {
            writeLog('Get car failed: Not found', 'ERROR', { id });
            return res.status(404).json({ error: 'Car not found' });
        }
        writeLog('Get car', 'SUCCESS', car);
        res.json({ message: 'Car retrieved', data: car });
    } catch (error) {
        writeLog('Get car error', 'ERROR', { error: error.message });
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/cars/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const carIndex = cars.findIndex(c => c.id === id);
        if (carIndex === -1) {
            writeLog('Update car failed: Not found', 'ERROR', { id });
            return res.status(404).json({ error: 'Car not found' });
        }
        const { brand, model, year, price } = req.body;
        if (!brand || !model || !year || !price) {
            writeLog('Update car failed: Missing fields', 'ERROR', req.body);
            return res.status(400).json({ error: 'Missing fields: brand, model, year, price' });
        }
        cars[carIndex] = { ...cars[carIndex], brand, model, year, price, updatedAt: new Date().toISOString() };
        writeLog('Car updated', 'SUCCESS', cars[carIndex]);
        res.json({ message: 'Car updated', data: cars[carIndex] });
    } catch (error) {
        writeLog('Update car error', 'ERROR', { error: error.message });
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/cars/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const carIndex = cars.findIndex(c => c.id === id);
        if (carIndex === -1) {
            writeLog('Delete car failed: Not found', 'ERROR', { id });
            return res.status(404).json({ error: 'Car not found' });
        }
        const deletedCar = cars.splice(carIndex, 1)[0];
        writeLog('Car deleted', 'SUCCESS', deletedCar);
        res.json({ message: 'Car deleted', data: deletedCar });
    } catch (error) {
        writeLog('Delete car error', 'ERROR', { error: error.message });
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    writeLog(`Server started on port ${port}`, 'INFO');
    console.log(`Server running at http://localhost:${port}`);
});