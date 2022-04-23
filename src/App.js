import Header from "./components/Header";
import Context from "./context/context";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <Context>
        <BrowserRouter>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Context>
    </div>
  );
}

export default App;
