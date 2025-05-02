import { LitElement, html } from "lit";
import homeStyles from "./home.styles.js";

/**
 * Home page component for Phoenix Lit
 *
 * @property {Object|String} flash - Flash messages from controller
 * @property {String} phoenixVersion - Phoenix version from controller
 */
export class HomeElement extends LitElement {
	static get styles() {
		return homeStyles;
	}

	static get properties() {
		return {
			/**
			 * Flash messages from controller
			 * @type {Object|String}
			 */
			flash: {
				type: Object,
				converter: {
					fromAttribute: (value) => {
						if (!value) return {};
						try {
							return JSON.parse(value);
						} catch (e) {
							console.error("Error parsing flash data:", e);
							return {};
						}
					},
				},
			},

			/**
			 * Phoenix version from controller
			 * @type {String}
			 */
			phoenixVersion: { type: String, attribute: "phoenix-version" },
		};
	}

	constructor() {
		super();
		this.flash = {};
		this.phoenixVersion = "";
	}

	renderFlashMessages() {
		const flashTypes = Object.keys(this.flash || {});

		if (flashTypes.length === 0) {
			return html``;
		}

		return html`
      <div class="flash-container">
        ${flashTypes.map((type) => {
					const message = this.flash[type];
					if (!message) return html``;

					return html`
            <div class="flash ${type}">
              ${message}
            </div>
          `;
				})}
      </div>
    `;
	}

	render() {
		return html`
      ${this.renderFlashMessages()}
      <div class="container">
        <div class="content">
          <div class="logo">Phoenix &amp; Web Components</div>

          <div class="title-bar">
            <span class="title-text">Phoenix Framework</span>
            <small class="version-badge">v${this.phoenixVersion}</small>
          </div>

          <h1>Peace of mind from prototype to production.</h1>

          <p>
            Build rich, interactive web applications quickly, with less code and fewer moving parts.
            Join our growing community of developers using Phoenix to craft APIs, HTML5 apps and more,
            for fun or at scale.
          </p>

          <div class="card-grid">
            <a href="https://hexdocs.pm/phoenix/overview.html" class="card">
              <div class="card-content">
                <div class="card-icon">📚</div>
                <span>Guides &amp; Docs</span>
              </div>
            </a>

            <a href="https://github.com/phoenixframework/phoenix" class="card">
              <div class="card-content">
                <div class="card-icon">💻</div>
                <span>Source Code</span>
              </div>
            </a>

            <a href="https://github.com/phoenixframework/phoenix/blob/v${this.phoenixVersion}/CHANGELOG.md" class="card">
              <div class="card-content">
                <div class="card-icon">📝</div>
                <span>Changelog</span>
              </div>
            </a>
          </div>

          <div class="link-grid">
            <a href="https://twitter.com/elixirphoenix" class="link">
              <div class="link-icon">🐦</div>
              Follow on Twitter
            </a>

            <a href="https://elixirforum.com" class="link">
              <div class="link-icon">💬</div>
              Discuss on the Elixir Forum
            </a>

            <a href="https://web.libera.chat/#elixir" class="link">
              <div class="link-icon">💬</div>
              Chat on Libera IRC
            </a>

            <a href="https://discord.gg/elixir" class="link">
              <div class="link-icon">🎮</div>
              Join our Discord server
            </a>

            <a href="https://fly.io/docs/elixir/getting-started/" class="link">
              <div class="link-icon">🚀</div>
              Deploy your application
            </a>
          </div>
        </div>
      </div>
    `;
	}
}

window.customElements.define("home-element", HomeElement);
