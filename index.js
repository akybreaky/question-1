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
function findAverageAndMedian(numlist) {
  var numbers= numlist.split(',');
  for(var i=0; i<numbers.length;i++){
    if(isNaN(numbers[i])){
      return false;
    }
  }
  var median;
  var average;
  var total=0;
  for(var i=0; i<numbers.length;i++){
    var num = parseInt(numbers[i]);
    total+=num;
  }
  average = total/numbers.length;
  const numSort=numbers.sort((a,b)=> a-b);
  const middleIndex= numbers.length/2;
  if(numbers.length %2 !==0){
    median = numSort[Math.floor(middleIndex)];
  }else{
    median = (parseFloat(numSort[middleIndex-1]) + parseFloat(numSort[middleIndex]))/2;
  }
  return "The average is " + average + " The median is " + median ;
 
}

app.get('/findAverageAndMedian', (req,res) =>{
  let {numlist} = req.query;
  let result = findAverageAndMedian(numlist);
  if(result ==false){
    res.end("Invalid input.");
  }else{
    res.end(result);
  }
  
});

// D) Function: find4Digits
function find4Digits(string) {
    if (typeof string !== 'string') {
        return false;
    }
    
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
