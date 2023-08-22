// @ts-nocheck
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { Route, Routes } from 'react-router-dom';
import "../src/components/pages/Dashboard"
import Dashboard from '../src/components/pages/Dashboard';
import Users from '../src/components/pages/Users';
import Admin from '../src/components/pages/Admin';
import Employees from '../src/components/pages/Employees';
import Roles from '../src/components/pages/Roles';
import Coupons from '../src/components/pages/Coupons';
import Charges from '../src/components/pages/Charges';
import AllBookings from './components/pages/AllBookings';
import CancelBookings from './components/pages/CancelBookings';
import Categories from '../src/components/pages/Categories';
import Banners from '../src/components/pages/Banners';
import Items from '../src/components/pages/Items';
import Vehicles from '../src/components/pages/Vehicles';
import Payment from '../src/components/pages/Payment';
import Setting from '../src/components/pages/Setting';
import Login from '../src/components/pages/Login';
import { ChakraProvider } from '@chakra-ui/react';
import UnreadMails from './components/pages/UnreadMails';
import AllMails from './components/pages/AllMails';
import AllDrivers from './components/pages/AllDrivers';
import QueDrivers from './components/pages/QueDrivers';
import { ToastContainer } from 'react-toastify';
import ViewBooking from './components/pages/ViewBooking';
import DriverDetails from './components/pages/DriverDetails';
import QueDriverDetails from './components/pages/QueDriverDetails';
import ViewAllBookingDetails from './components/pages/ViewAllBookingDetails';
import AdminEarning from './components/pages/AdminEarning';
import ChangePassword from './components/pages/ChangePassword';


function App() {
  return (
    <>
      <ToastContainer />
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/employees" element={<Employees />}></Route>
          <Route path="/roles" element={<Roles />}></Route>
          <Route path="/unreadMails" element={<UnreadMails />}></Route>
          <Route path="/allMails" element={<AllMails />}></Route>
          <Route path="/allDrivers" element={<AllDrivers />}></Route>
          <Route path="/queDrivers" element={<QueDrivers />}></Route>
          <Route path="/coupons" element={<Coupons />}></Route>
          <Route path="/charges" element={<Charges />}></Route>
          <Route path="/allbookings" element={<AllBookings />}></Route>
          <Route path="/cancelbookings" element={<CancelBookings />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/banners" element={<Banners />}></Route>
          <Route path="/items" element={<Items />}></Route>
          <Route path="/vehicle" element={<Vehicles />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/admin_earnings" element={<AdminEarning />}></Route>
          <Route path="/settings" element={<Setting />}></Route>
          <Route path='/view_bookings' element={<ViewBooking/>}></Route>
          <Route path='/driver-details' element={<DriverDetails/>}/>
          <Route path='/que-driver-details' element={<QueDriverDetails/>}/>
          <Route path='/view_all_booking_details' element={<ViewAllBookingDetails/>}/>
          <Route path='/change_password' element={<ChangePassword/>}/>
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
