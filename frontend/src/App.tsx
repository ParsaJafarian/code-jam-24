import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingFallback from './components/LoadingFallback'

// Sample route configuration
const routes = [
  { path: '/', component: React.lazy(() => import('./pages/Home')) },
  { path: '/about', component: React.lazy(() => import('./pages/About')) },
  { path: '/reader', component: React.lazy(() => import('./pages/Reader')) },
  { path: '/get-started', component: React.lazy(() => import('./pages/GetStarted')) },
]

function App() {
  return (
    <Router>
      <React.Suspense fallback={<LoadingFallback />}>
        <Routes>
          {routes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </React.Suspense>
    </Router>
  )
}

export default App

