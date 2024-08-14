const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


function findSummation(number = 1){
  if(number <= 0 || isNaN(number)){
      return false;
  }else{
      var sum = 0;
      for(var i = 0; i<= number; i++){
          sum+= i;
      }
      return sum;
  }
}
app.post('/findSummation', (req,res) =>{
  const {number} = req.body;
  const result = findSummation(number);
  res.send({result});
})
function uppercaseFirstandLast(string){
  var array = string.split('');
  let modifiedString = "";
  for(var i = 0; i < array.length ; i++){
     if(i === 0 || i === array.length-1){
      modifiedString += array[i].toUpperCase();
     }else{
      modifiedString += array[i];
     }
  }
  return modifiedString;
}
app.post('/uppercaseFirstandLast', (req,res) =>{
  const {string} = req.body;
  const result = uppercaseFirstandLast(string);
  res.json({result});
})
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
function find4Digits(string){
  var pattern = /\d+/
  var digits = ""
  if(!pattern.test(string)){
      return false;
  }else{
      var array = string.split(" ");
      for(var i=0; i<4 ; i++){
          digits+= " " + array[i];
      }
  }
  return digits;
}
app.post('/find4Digits', (req,res) =>{
  const {digits} = req.body;
  const result = find4Digits(digits);
  res.json({result});
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
