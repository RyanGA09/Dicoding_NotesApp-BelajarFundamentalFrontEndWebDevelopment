// **scripts/app-footer.js**
class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
        <p>Copyright &copy; 2025 Notes App. All rights reserved.</p>
    </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
