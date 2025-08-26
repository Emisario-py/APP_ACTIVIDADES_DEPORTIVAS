import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TarjetaDeporte } from './Components/TarjetaDeporte'
import { FormularioGeneral } from './Components/FormularioGeneral'


const App = () => {
  return (
    <div>
     <h1>Bienvenido</h1>
      <Router>
      <Routes>
        <Route path="/" element={<TarjetaDeporte/>} />

          <Route path="/FormularioGeneral" element={<FormularioGeneral />} />
          <Route path="/FormularioGeneral" element={<FormularioGeneral />} />
          <Route path="/FormularioGeneral" element={<FormularioGeneral />} />
          <Route path="/FormularioGeneral" element={<FormularioGeneral />} />
   
      </Routes>
    </Router>
    </div>
  )
}

export default App