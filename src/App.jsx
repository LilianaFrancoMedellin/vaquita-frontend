import { Route, Routes } from 'react-router-dom';
import GroupsPage from './pages/GroupsPage';
import FriendsPage from './pages/FriendPage';
import ExpensesPage from './pages/ExpensesPage';
import HomePage from './pages/HomePage';
import MyAccountPage from './pages/MyAccountPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const App = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Navbar />
      <main className='mt-4 mb-auto px-8 lg:px-40'>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/groups'
            element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/friends'
            element={
              <ProtectedRoute>
                <FriendsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/expenses'
            element={
              <ProtectedRoute>
                <ExpensesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/my-account'
            element={
              <ProtectedRoute>
                <MyAccountPage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<>Not found</>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
