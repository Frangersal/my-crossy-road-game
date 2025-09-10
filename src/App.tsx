import "./App.css";

type Props = {};

export default function App(_: Props) {
  return (
    <header className="app-root" role="banner">
      <div className="app-inner">
        <div className="app-left">
          <h1 className="app-title">🐸 CROSSY ROAD 🕹️</h1>
          <p className="app-desc">
            Video juego inspirado en Crossy Road y Frogger, hecho con React.Js, Three.js y TypeScript
          </p>

          <p className="panel-text"></p>
        </div>

        <div className="app-right">
          <div className="app-panel">
            <h2 className="panel-title">Agradecimientos</h2>
            <p className="app-credit">
              Realizado siguiendo un tutorial de YouTube realizado por {" "}
              <a
                href="https://www.youtube.com/results?search_query=Hunor+Marton+Borbely"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hunor Marton Borbely
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <footer className="app-footer" role="contentinfo">
        <a
          className="github-link"
          href="https://github.com/Frangersal/my-crossy-road-game"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Repository on GitHub"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 .198a8 8 0 00-2.53 15.59c.4.075.547-.175.547-.388 0-.19-.007-.693-.01-1.36-2.225.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.727-.497.055-.487.055-.487.803.057 1.225.825 1.225.825.714 1.223 1.873.87 2.33.665.072-.517.28-.87.51-1.07-1.777-.202-3.644-.888-3.644-3.953 0-.873.312-1.587.824-2.148-.083-.203-.357-1.017.078-2.12 0 0 .672-.215 2.2.82a7.66 7.66 0 012.003-.27 7.66 7.66 0 012.003.27c1.527-1.035 2.198-.82 2.198-.82.437 1.103.163 1.917.08 2.12.513.561.823 1.275.823 2.148 0 3.073-1.87 3.748-3.652 3.947.288.248.543.736.543 1.485 0 1.073-.01 1.939-.01 2.203 0 .215.145.467.55.387A8 8 0 008 .198z"
              fill="currentColor"
            />
          </svg>
        </a>

        <a
          className="github-link"
          href="https://frangersal.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Personal site"
        >
          <img src="/fgsm.png" alt="fgsm" className="fgsm-icon" />
        </a>

        
        <span className="footer-text">
          - Hecho por Frangersal -
        
        </span>
      </footer>
    </header>
  );
}
