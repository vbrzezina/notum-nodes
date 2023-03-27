import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { queryClient } from './api'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import ErrorComponent from './components/ErrorBoundary/ErrorComponent'
import Loader from './components/Loader'
import reportWebVitals from './reportWebVitals'
import { theme } from './styles/theme'

const AppLayout = lazy(() => import('./components/App/App'))
const Map = lazy(() => import('./pages/Nodes'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/404'))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary FallbackComponent={ErrorComponent}>
              <Router>
                <Routes>
                  <Route path='/login' element={<Login />} />
                  <Route path='/' element={<AppLayout />}>
                    <Route path='/' element={<Map />} />
                  </Route>
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Router>
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
