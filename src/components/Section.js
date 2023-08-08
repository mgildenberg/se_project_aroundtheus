class Section {
  constructor({ items, renderer }, cardElementsSelector) {
    // this will be used primarily for creating the cards section
    // the items are the already-made Card objects
    // it will need to take in card elements
    // the renderer will and organize them into neat HTML elements
    // the cardElementsSelector says where the neat HTML elements will go
    this._items = items;
    this._renderer = renderer;
    this._cardElementsContainer = document.querySelector(cardElementsSelector);
  }

  //   renderItems() {
  //     this._render;
  //   }

  renderItems() {
    // use this to create the elements for rendering
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._cardElementsContainer.append(element);
  }

  prependItem(domElement) {
    this._containerElement.prepend(element);
  }
}

// const cardSection = new Section();
