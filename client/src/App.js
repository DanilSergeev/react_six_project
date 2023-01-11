import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponents from "./pages/block/HeaderComponents";
import HomePage from "./pages/HomePage";
import ThreePage from "./pages/ThreePage";
import SixProjectPage from "./pages/SixProjectPage";
import TempName from "./pages/TempName";
import './style/style.css';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponents></HeaderComponents>
      <main>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/six' element={<SixProjectPage/>} />
          <Route path='/temp' element={<TempName/>} />
          <Route path='/hook' element={<ThreePage/>} />
        </Routes>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
