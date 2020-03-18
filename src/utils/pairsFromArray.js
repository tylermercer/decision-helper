const pairsFromArray = (arr) => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
      let a = { index: i, item: arr[i]};
      let b = { index: j, item: arr[j]};
      res.push([a, b]);
    }
  }
  return res;
}

export default pairsFromArray;