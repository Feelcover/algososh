export const randomSortArr = () => {
  const arrLength = Math.floor(Math.random() * 14) + 3;
  let sortArr = [];
  for (let i = 0; i <= arrLength - 1; i++) {
    let randomNumber = Math.floor(Math.random() * 100);
    sortArr.push(randomNumber);
  }
  return sortArr;
};
