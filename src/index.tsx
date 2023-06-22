import ReactDOM from 'react-dom/client';

import App from './App';

import './index.scss';
import './reset.scss';

const containerEl = document.getElementById('app__container');
const root = ReactDOM.createRoot(containerEl as Element);
root.render(<App />);
