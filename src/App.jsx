import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import Header from './components/Header';
import './styles/main.scss';
const Detail = lazy(() => import('./pages/Detail'));
const Explore = lazy(() => import('./pages/Explore'));
const Data = lazy(() => import('./pages/Data'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" component={Explore} />
        <Route path="/data" component={Data} />
        <Route path="/locations/:id" component={Detail} />
        <Route path="*" component={NotFound} />
      </Routes>
    </>
  );
}

export default App;
