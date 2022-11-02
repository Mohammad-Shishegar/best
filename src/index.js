import App from './App';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
// import "leaflet/dist/leaflet.css";
import '@fortawesome/free-solid-svg-icons';
import '@fortawesome/react-fontawesome';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './i18n';
import FirstInroPage from './Pages/FirstIntroPage/FirstInroPage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
