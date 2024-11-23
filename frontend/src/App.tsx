// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sample route configuration
const routes = [
  { path: '/', component: React.lazy(() => import('./pages/Home')) },
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
