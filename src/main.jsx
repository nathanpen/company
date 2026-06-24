import { createRoot } from 'react-dom/client';

import '../styles/themes.css';
import '../styles/tokens.css';
import '../styles/main.css';
import '../styles/flow-react.css';

import DataFlowDiagram from './flow/DataFlowDiagram';

const rootEl = document.getElementById('data-flow-root');

if (rootEl) {
  createRoot(rootEl).render(<DataFlowDiagram />);
}
