// App.tsx
import path from 'path';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sample route configuration
const routes = [
  { path: '/', component: React.lazy(() => import('./pages/Home')) },
  { path: '/about', component: React.lazy(() => import('./pages/About')) },
  { path: '/reader', component: React.lazy(() => import('./pages/Reader')) },
];

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
