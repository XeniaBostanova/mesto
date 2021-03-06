export default class Section {
  constructor({items, renderer}, container) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this.addItem(item);
    });
  }

}
