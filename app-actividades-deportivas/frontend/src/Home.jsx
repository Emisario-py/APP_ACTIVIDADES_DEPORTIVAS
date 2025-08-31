import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TarjetaDeporte } from './Components/TarjetaDeporte'
import { FormularioGeneral } from './Components/FormularioGeneral'




export const Home = () => {
  return (
    <div>
     <h1>Bienvenido</h1>
      <Router>
      <Routes>

        <Route path="/home" element={/*<PrivateRoute>*/<TarjetaDeporte/>/*</PrivateRoute>*/} />
        <Route path="/FormularioGeneral/:deporte" element={/*<PrivateRoute>*/<FormularioGeneral />/*</PrivateRoute>*/} />

      </Routes>
    </Router>
    </div>
  )
}
