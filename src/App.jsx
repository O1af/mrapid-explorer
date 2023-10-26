import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import './styles/main.scss';
const Detail = lazy(() => import('./pages/Detail'));
const Explore = lazy(() => import('./pages/Explore'));
const Data = lazy(() => import('./pages/Data'));
const NotFound = lazy(() => import('./pages/NotFound'));
const About = lazy(() => import ('./pages/About'));
const FAQ = lazy(() => import ('./pages/FAQ/FAQ'));
const FAQ_O3 = lazy(() => import ('./pages/FAQ/FAQ_O3'));
const FAQ_PM25 = lazy(() => import ('./pages/FAQ/FAQ_PM25'));
const FAQ_NOX = lazy(() => import ('./pages/FAQ/FAQ_NOX'));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/map" component={Explore} />
        <Route path="/locations/:id" component={Detail} />
        <Route path="*" component={NotFound} />
        <Route path="/data" component={Data} />
        <Route path="/" component={Explore} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/faq-o3" component={FAQ_O3} />
        <Route path="/faq-pm25" component={FAQ_PM25} />
        <Route path="/faq-nox" component={FAQ_NOX} />
      </Routes>
    </>
  );
}

export default App;
