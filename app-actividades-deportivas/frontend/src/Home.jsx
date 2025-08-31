
import { TarjetaDeporte } from './Components/TarjetaDeporte'
import { FormularioGeneral } from './Components/FormularioGeneral'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



export const Home = () => {
  return (
    <div>
     <h1>Bienvenido</h1>
      <Router>
      <Routes>

        <Route path="/" element={/*<PrivateRoute>*/<TarjetaDeporte/>/*</PrivateRoute>*/} />
        <Route path="/FormularioGeneral/:deporte" element={/*<PrivateRoute>*/<FormularioGeneral />/*</PrivateRoute>*/} />

      </Routes>
    </Router>
    </div>
  )
}
