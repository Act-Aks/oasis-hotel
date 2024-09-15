import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import routes from './constants/routes'
import Account from './pages/Account'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Settings from './pages/Settings'
import Users from './pages/Users'
import GlobalStyles from './styles/globalStyles'
import AppLayout from './ui/AppLayout'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DarkModeProvider } from './context/DarkModeContext'
import BookingOverview from './pages/BookingOverview'
import CheckIn from './pages/CheckIn'
import ProtectedRoute from './ui/ProtectedRoute'
import Toaster from './ui/Toaster'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to={routes.Dashboard} />} />
              <Route path={routes.Dashboard} element={<Dashboard />} />
              <Route path={routes.BookingDetails} element={<BookingOverview />} />
              <Route path={routes.CheckIn} element={<CheckIn />} />
              <Route path={routes.Bookings} element={<Bookings />} />
              <Route path={routes.Cabins} element={<Cabins />} />
              <Route path={routes.Users} element={<Users />} />
              <Route path={routes.Settings} element={<Settings />} />
              <Route path={routes.Account} element={<Account />} />
            </Route>
            <Route path={routes.Login} element={<Login />} />
            <Route path={routes.Error} element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster />
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
