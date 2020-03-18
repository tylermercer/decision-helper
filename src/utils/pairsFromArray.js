const pairsFromArray = (arr) => {
  let res = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
      let a = { index: i, item: arr[i]};
      let b = { index: j, item: arr[j]};
      res.push(count % 2 === 1 ? [a, b] : [b, a]);
      count += 1;
    }
  }
  return res;
}

export default pairsFromArray;