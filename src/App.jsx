import { Route, Routes } from "react-router-dom";
import GroupsPage from "./pages/GroupsPage";
import FriendsPage from "./pages/FriendPage";
import ExpensesPage from "./pages/ExpensesPage";
import HomePage from "./pages/HomePage";
import MyAccountPage from "./pages/MyAccountPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <main className="mt-4 mb-auto px-8 lg:px-40">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
