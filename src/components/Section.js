class Section {
  constructor({ items, renderer }, cardElementsSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardElementsContainer = document.querySelector(cardElementsSelector);
  }

  renderItems() {
    // use this to create the elements for rendering
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  prependItem(element) {
    this._cardElementsContainer.prepend(element);
  }
}

export default Section;
