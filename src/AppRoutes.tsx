import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom';


const Home = lazy(() => import('./features/home'))
const Details = lazy(() => import('./features/details'))


const AppRoutes = () => (
    <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/country-details/:country" element={<Details />} />
    </Routes>
)

export default AppRoutes