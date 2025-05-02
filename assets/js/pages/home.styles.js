import { css } from "lit";

export default css`
  :host {
    display: block;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #18181b;
    max-width: 100%;
  }

  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .content {
    max-width: 800px;
  }

  .logo {
    color: #FD4F00;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .title-bar {
    display: flex;
    align-items: center;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .title-text {
    font-size: 0.875rem;
    font-weight: 600;
    color: #fd4f00;
  }

  .version-badge {
    margin-left: 0.75rem;
    background-color: rgba(253, 79, 0, 0.1);
    border-radius: 9999px;
    padding: 0.25rem 0.5rem;
    font-size: 0.8125rem;
    font-weight: 500;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.25;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.75;
    color: #52525b;
    margin-bottom: 2.5rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .card {
    position: relative;
    background-color: #fafafa;
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    text-decoration: none;
    color: #18181b;
    display: block;
  }

  .card:hover {
    background-color: #f4f4f5;
    transform: scale(1.05);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 1;
  }

  .card-icon {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(24, 24, 27, 0.1);
    border-radius: 0.5rem;
    color: #18181b;
    font-weight: bold;
  }

  .link-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: #71717a;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .link:hover {
    background-color: #f4f4f5;
    color: #18181b;
  }

  .link-icon {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(161, 161, 170, 0.2);
    border-radius: 50%;
    font-size: 0.75rem;
  }

  .flash {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    background-color: #f0f9ff;
    color: #0369a1;
  }

  .flash.info {
    background-color: #f0f9ff;
    color: #0369a1;
  }

  .flash.error {
    background-color: #fef2f2;
    color: #b91c1c;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      color: #e4e4e7;
      background-color: #18181b;
    }

    .logo {
      color: #ff6b33;
    }

    .title-text {
      color: #ff6b33;
    }

    .version-badge {
      background-color: rgba(255, 107, 51, 0.2);
      color: #ff6b33;
    }

    h1 {
      color: #f4f4f5;
    }

    p {
      color: #a1a1aa;
    }

    .card {
      background-color: #27272a;
      color: #e4e4e7;
    }

    .card:hover {
      background-color: #3f3f46;
    }

    .card-icon {
      background-color: rgba(228, 228, 231, 0.1);
      color: #e4e4e7;
    }

    .link {
      color: #a1a1aa;
    }

    .link:hover {
      background-color: #27272a;
      color: #e4e4e7;
    }

    .link-icon {
      background-color: rgba(161, 161, 170, 0.1);
    }

    .flash {
      background-color: #0c4a6e;
      color: #bae6fd;
    }

    .flash.info {
      background-color: #0c4a6e;
      color: #bae6fd;
    }

    .flash.error {
      background-color: #7f1d1d;
      color: #fecaca;
    }
  }
`;
