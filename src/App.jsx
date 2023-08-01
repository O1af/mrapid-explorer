import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import './styles/main.scss';
const Detail = lazy(() => import('./pages/Detail'));
const Explore = lazy(() => import('./pages/Explore'));
const Data = lazy(() => import('./pages/Data'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Home = lazy(() => import ('./pages/Home'));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/map" component={Explore} />
        <Route path="/locations/:id" component={Detail} />
        <Route path="*" component={NotFound} />
        <Route path="/data" component={Data} />
        <Route path="/" component={Home} />
      </Routes>
    </>
  );
}

export default App;
