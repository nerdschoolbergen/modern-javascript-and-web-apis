'use strict';
const varTest = () => {
  console.log('===varTest===');
  var x = 1;
  if (true) {
    var x = 2;
    console.log(x);
  }
  console.log(x);
}

const letTest = () => {
  console.log('===letTest===');
  let x = 1;
  if (true) {
    let x = 2;
    console.log(x);
  }
  console.log(x);
}

varTest();
letTest();
