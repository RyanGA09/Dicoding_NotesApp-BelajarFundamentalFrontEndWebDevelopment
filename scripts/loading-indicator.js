// **scripts/loading-indicator.js**
class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="loading">Loading...</div>`;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
