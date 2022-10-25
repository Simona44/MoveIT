import './App.css';
import { Routes, Route } from "react-router-dom";

import { GlobalProvider } from './context/GlobalState';

import NavBar from './components/NavBar';
import AddOrder from './components/AddOrder';
import OrderDetails from './components/OrderDetails';
import OrdersList from './components/OrdersList';

function App() {
  return (
    <GlobalProvider>
      <section>
        <NavBar />
        <Routes>
          <Route path="/" element={<AddOrder />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="orders/:id" element={<OrderDetails />}/>
        </Routes>
      </section>
    </GlobalProvider>
  );
}

export default App;
