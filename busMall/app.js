'use strict';
var totalClick = 0;
var leftImageEl = document.getElementById('left');
var centerImageEl = document.getElementById('center');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');
// allProducts.tallyEl = document.getElementById('tally');


// leftImageEl.src = 'images/';
// leftImageEl.name = 'images/';
// leftImageEl.title = 'images/';

// centerImageEl.src = '';
// centerImageEl.name = '';
// centerImageEl.title = '';

// rightImageEl.src = '';
// rightImageEl.name = '';
// rightImageEl.title = '';

var allProducts = [];
allProducts.uniqueArray = [];

function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}


// function renderProducts(){
//   var uniquePicsArray = [];

//   uniquePicsArray[0] = makeRandom();
//   uniquePicsArray[1] = makeRandom();
//   uniquePicsArray[2] = makeRandom();

//   while (uniquePicsArray[0] === uniquePicsArray[1]){
//     uniquePicsArray[1] = makeRandom();
//   }
//   while(uniquePicsArray[0] === uniquePicsArray[2]){
//     uniquePicsArray[2] = makeRandom();
//   }
//   while (uniquePicsArray[1] === uniquePicsArray[2]){
//     uniquePicsArray[2] = makeRandom();
//   }


//   allProducts[uniquePicsArray[0]].views++;
//   leftImageEl.src = allProducts[uniquePicsArray[0]].path;
//   leftImageEl.title = allProducts[uniquePicsArray[0]].name;
//   leftImageEl.name = allProducts[uniquePicsArray[0]].name;



//   allProducts[uniquePicsArray[1]].views++;
//   centerImageEl.src = allProducts[uniquePicsArray[1]].path;
//   centerImageEl.title = allProducts[uniquePicsArray[1]].name;
//   centerImageEl.name = allProducts[uniquePicsArray[1]].name;

//   allProducts[uniquePicsArray[2]].views++;
//   rightImageEl.src = allProducts[uniquePicsArray[2]].path;
//   rightImageEl.title = allProducts[uniquePicsArray[2]].name;
//   rightImageEl.name = allProducts[uniquePicsArray[2]].name;
//

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');

if (localStorage.getItem('storedProducts') !== null) {
  console.log('Data found');
  Product.allProducts = JSON.parse(localStorage.getItem('storedProducts'));
} else {
  console.log('Not found');
  localStorage.setItem('storedProducts', JSON.stringify(Product.allProducts));
}


// getChartData();
function uniqueArrayGenerator() {
  while (allProducts.uniqueArray.length < 7) {
    var random = makeRandom();
    while (!allProducts.uniqueArray.includes(random)) {
      console.log('building unique array: ', allProducts.uniqueArray);
      allProducts.uniqueArray.push(random);
    }
  }
}

function displayPics() {
  uniqueArrayGenerator();
  for (var i = 0; i < Product.pics.length; i++) {
    var temp = allProducts.uniqueArray.shift();
    // console.log('allProducts Array:', allProducts);
    console.log('allProducts:', Product.pics[i]);
    Product.pics[i].src = allProducts[temp].path;
    Product.pics[i].id = allProducts[temp].name;
    Product.pics[i].title = allProducts[temp].name;
    allProducts[temp].views += 1;

  }
}
Product.pics = [
  leftImageEl,
  centerImageEl,
  rightImageEl

];
function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  console.log(event.target);

  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImage) {
      allProducts[i].clicks +=1;
    }
  }
  if (totalClick === 2) {
    containerEl.removeEventListener('click', handleClick, true);
    containerEl.remove();
    localStorage.setItem('storedProducts', JSON.stringify(Product.allProducts));


  }
  parentEl.innerHTML = '';
  render();

  allProducts.clicksData.push(allProducts.clicks);
  displayPics();
  totalClick++;
  



}

allProducts.clicks = [];
allProducts.nameData = [];
allProducts.viewsData = [];
allProducts.clicksData = [];



// Product.data = {
//   labels:Product.nameData,
//   datasets:[{
//     fillColor:'rgba (220,220,220,0.75)',
//     strokeColor: 'rgba(220,220,220,1)',
//     data:Product.viewsData
//   },
//   {
//     fillColor: 'rgba(220,220,220,0.75)',
//     strokeColor:'rgba(220,220,220,1)',
//     data: Product.clicksData
//   }

//   ]
// };



var parentEl = document.getElementById('parentElement');

var child = document.createElement('h1');
child.textContent = 'Data: ';
parentEl.appendChild(child);
function render() {
  for( var i = 0; i<allProducts.length; i++) {
    var childEl = document.createElement('li');
    childEl.textContent = `Product...  ${allProducts[i].name}     Views... ${allProducts[i].views}     Clicks...${allProducts[i].clicks}`;
    parentEl.appendChild(childEl);
  }


}
displayPics();


function getChartData(){

  for(var i = 0; i < allProducts.length;i++){
    allProducts.nameData.push(allProducts[i].name);
    allProducts.clicksData.push(allProducts[i].clicks);
  }
}
var chartRender= function(){
  getChartData();
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allProducts.nameData,
      datasets: [{
        label: '# of Votes',
        data: allProducts.clicksData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};


containerEl.addEventListener('click', handleClick, true);

chartRender();


// var data = [];

// function Data(){

// }
// this.myChart.update();


