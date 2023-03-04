export const randArr = () => {
  const res: number[] = [];
  const resLength = Math.floor(Math.random() * 4);
  for (let i = 0; i < (resLength > 3 ? resLength : 3); i++) {
    res.push(Math.floor(Math.random() * 101));
  }
  return res;
};
