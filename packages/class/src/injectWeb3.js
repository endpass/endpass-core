export default target => web3 => {
  target.web3 = web3;
  return target;
};
