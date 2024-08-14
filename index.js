const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// A) Function: findSummation
function findSummation(number = 1) {
    if (number <= 0 || isNaN(number)) {
        return false;
    }
    let sum = 0;
    for (let i = 1; i <= number; i++) {
        sum += i;
    }
    return sum;
}

app.post('/findSummation', (req, res) => {
    const { number } = req.body;
    const result = findSummation(number);
    res.json({ result });
});

// B) Function: uppercaseFirstandLast
function uppercaseFirstandLast(string) {
    return string.split(' ').map(word => {
        if (word.length > 1) {
            return word[0].toUpperCase() + word.slice(1, -1) + word.slice(-1).toUpperCase();
        } else {
            return word.toUpperCase();
        }
    }).join(' ');
}

app.post('/uppercaseFirstandLast', (req, res) => {
    const { string } = req.body;
    const result = uppercaseFirstandLast(string);
    res.json({ result });
});

// C) Function: findAverageAndMedian
function findAverageAndMedian(numArray) {
    const numbers = numArray.map(Number).filter(num => !isNaN(num));
    if (numbers.length === 0) return false;

    const average = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedNumbers.length / 2);

    const median = sortedNumbers.length % 2 !== 0
        ? sortedNumbers[middleIndex]
        : (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;

    return { average, median };
}

app.post('/findAverageAndMedian', (req, res) => {
    const { numArray } = req.body;
    const result = findAverageAndMedian(numArray);
    res.json(result || { error: "Invalid input." });
});

// D) Function: find4Digits
function find4Digits(string) {
    const match = string.match(/\b\d{4}\b/);
    return match ? match[0] : false;
}

app.post('/find4Digits', (req, res) => {
    const { string } = req.body;
    const result = find4Digits(string);
    res.json({ result });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
