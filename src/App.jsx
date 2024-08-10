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

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to={routes.Dashboard} />} />
            <Route path={routes.Dashboard} element={<Dashboard />} />
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
    </>
  )
}

export default App
