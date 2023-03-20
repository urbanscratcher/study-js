import icons from 'url:../../img/icons.svg'; // Parcel 2

// make it default bcz not gonna generate an instance
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}.svg#icon-loader"></use>
          </svg>
        </div>
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
          <div>
          <svg>
              <use href="${icons}#icon-alert-triangle"></use>
          </svg>
          </div>
          <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
          <div>
          <svg>
              <use href="${icons}#icon-smile"></use>
          </svg>
          </div>
          <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // Publisher (Code that knows when to react)
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
}
