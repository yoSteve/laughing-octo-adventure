module.exports = function(arr) {
  var copy = new Array(arr.length);
  var i = 0;
  while(i < arr.length) {
    copy[i] = new Array(arr[i].length);
    var j = 0;
    while(j < arr[i].length) {
    copy[i][j] = arr[i][j];    
    j++;
  }
    i++;
  }
  return copy;
}
