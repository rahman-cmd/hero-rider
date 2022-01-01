import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import RiderSignUp from './pages/RiderSignUp/RiderSignUp';
import AuthContextProvider from './context/AuthContextProvider';
import LearnerSignUp from './pages/LearnerSignUp/LearnerSignUp';
import Login from './pages/Login/Login';
import UserProfile from './pages/UserProfile/UserProfile';
import ProtectedRoute from './components/ProtectRoute/ProtectRoute';
import Admin from './pages/Admin/Admin';
import AdminRoute from './components/AdminRoute/AdminRoute';
import OrderAndPay from './pages/OrderAndPay/OrderAndPay';

function App() {
   return (
      <div className='App'>
         <AuthContextProvider>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/home' element={<Home />} />
               <Route path='/riderSignUp' element={<RiderSignUp />} />
               <Route path='/learnerSignUp' element={<LearnerSignUp />} />
               <Route path='/login' element={<Login />} />
               <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
               <Route path='/pay' element={<ProtectedRoute><OrderAndPay /></ProtectedRoute>} />
               <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />
            </Routes>
         </AuthContextProvider>
      </div>
   );
}

export default App;
