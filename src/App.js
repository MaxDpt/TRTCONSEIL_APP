
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from "./pages/Home_page";
import Registration from "./pages/Registration_page";
import Login from "./pages/Login_page";
import Profil from "./pages/Profil_page";
import Advertisement from "./pages/Publications_page";
import BackOffice from "./pages/BackOffice_page";
import Protected_Advertisement from "./protections/Protection_Advertisement";
import Protected_Login from "./protections/Protection_Login";
import Protected_Admin from "./protections/Protection_admin";
import Protected_Users from "./protections/Protection_users";

export default function App() {

  return (
    <Router>
    <Layout>
      <Routes>
        <Route  path="/Login" element={<Protected_Advertisement> <Login/> </Protected_Advertisement>} />
        <Route  path="/Registration" element={<Protected_Advertisement> <Registration/> </Protected_Advertisement>} />
        <Route  path="/Profil" element={<Protected_Users> <Profil/> </Protected_Users>} />
        <Route  path="/Advertisement" element={<Protected_Login> <Advertisement/> </Protected_Login>} />
        <Route  path="/BackOffice" element={<Protected_Admin> <BackOffice/> </Protected_Admin>} />
        <Route  path="/" element={<Protected_Advertisement> <Home/> </Protected_Advertisement>} />
      </Routes>
    </Layout>
    </Router>
  );
}