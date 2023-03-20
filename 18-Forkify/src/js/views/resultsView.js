import View from './view.js';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _errorMessage = `No recipes found for your query! Please try again ;)`;
  _message = '';
  _parentEl = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
