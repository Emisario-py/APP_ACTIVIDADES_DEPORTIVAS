import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TarjetaDeporte } from './Components/TarjetaDeporte'
import { FormularioBasquetbol } from './Components/FormularioBasquetbol'
import { FormularioAtletismo } from './Components/FormularioAtletismo'
import { FormularioGymnasio } from './Components/FormularioGymnasio'
import { FormularioFutbol } from './Components/FormularioFutbol'

const App = () => {
  return (
    <div>
     <h1>Bienvenido</h1>
      <Router>
      <Routes>
        <Route path="/" element={<TarjetaDeporte/>} />

          <Route path="/FormularioBasquetbol" element={<FormularioBasquetbol />} />
          <Route path="/FormularioFutbol" element={<FormularioFutbol />} />
          <Route path="/FormularioGymnasio" element={<FormularioGymnasio />} />
          <Route path="/FormularioAtletismo" element={<FormularioAtletismo />} />
   
      </Routes>
    </Router>
    </div>
  )
}

export default App