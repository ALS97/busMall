'use strict';
var totalClick= 0;
var leftImageEl = document.getElementById('left');
var centerImageEl = document.getElementById('center');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');

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

function Product(name){
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
function makeRandom(){
  return Math.floor(Math.random()* allProducts.length);
}




function renderProducts(){
  var uniquePicsArray = [];

  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();

  while (uniquePicsArray[0] === uniquePicsArray[1]){
    uniquePicsArray[1] = makeRandom();
  }
  while(uniquePicsArray[1] === uniquePicsArray[2]){
    uniquePicsArray[1] = makeRandom();
  }
  while (uniquePicsArray[0] === uniquePicsArray[2]){
    uniquePicsArray[2] = makeRandom();
  }


  allProducts[uniquePicsArray[0]].views++ ;
  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;



  allProducts[uniquePicsArray[1]].views++ ;
  centerImageEl.src = allProducts[uniquePicsArray[1]].path;
  centerImageEl.title = allProducts[uniquePicsArray[1]].name;
  centerImageEl.name = allProducts[uniquePicsArray[1]].name;

  allProducts[uniquePicsArray[2]].views++ ;
  rightImageEl.src = allProducts[uniquePicsArray[2]].path;
  rightImageEl.title = allProducts[uniquePicsArray[2]].name;
  rightImageEl.name = allProducts[uniquePicsArray[2]].name;
}
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');





function handleClick(){
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);

  for(var i = 0; i< allProducts.length; i++){
    if(allProducts[i].name === chosenImage){
      allProducts[i].clicks++;
    }
    if(totalClick === 24){
      containerEl.removeEventListener('click', handleClick, true);

    }

    renderProducts();

  }
  totalClick++;

}



containerEl.addEventListener('click', handleClick, true);

renderProducts();

