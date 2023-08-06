export default class Section {
    constructor({ data, renderer }, containerSelector, userId) {
      this._renderedItems = data;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
      this._userId = userId;
    }
  
    setItem(element) {
      this._container.append(element);
    }
  
    renderItems() {
      this._renderedItems.forEach(item => {
        this._renderer(item, this._userId);
      });
    }
  }