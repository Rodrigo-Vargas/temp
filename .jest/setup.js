import '@testing-library/jest-dom'
window.matchMedia = jest.fn(() => true);
global.___loader = {
  enqueue: jest.fn(),
};
