const getElement = (selector, node = document) => {
  return node.querySelector(selector);
};

const getElements = (selector, node = document) => {
  return node.querySelectorAll(selector);
};
