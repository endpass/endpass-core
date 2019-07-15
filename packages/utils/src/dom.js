/**
 * Detects if given element is child of the other element
 *
 * @example
 * isChildOfElement(document.body, document.querySelector('p')) // true
 * isChildOfElement(document.querySelector('p'), document.body) // false
 *
 * @param {HTMLElement} element Checking parent element
 * @param {HTMLElement} child Searching child element
 * @returns {boolean}
 */
export const isChildOfElement = (element, child) => {
  const nodes = [];
  let currentNode = child;

  while (currentNode) {
    nodes.unshift(currentNode);
    currentNode = currentNode.parentNode;
  }

  return !!nodes.find(el => el === element);
};

export default {
  isChildOfElement,
};
