import userImg from "../assets/P1.jpg"
import userImg1 from "../assets/P2.jpg"
import userImg2 from "../assets/P3.jpg"
import userImg3 from "../assets/P4.jpg"
import { Link } from 'react-router-dom'


export const TarjetaDeporte = () => {
  const deportes = [
    {
        id: 1,
        name: "Basquetbol",
        img:  userImg,
        path: "./FormularioBasquetbol"
    },
    {
        id: 2,
        name: "Futbol", 
         img:  userImg1,
        path: "./FormularioFutbol"
    },
    {
        id: 3,
        name: "Gymnasio",
        img:  userImg2,
        path: "./FormularioGymnasio"
    },
    {
        id: 4,
        name: "Atletismo",
        img:  userImg3,
        path: "./FormularioAtletismo"
    }
]
return (
    <div className="Card">
      <h2>Selecciona tu deporte</h2>
      <div className="contenedor-deportes">
        {deportes.map((deporte) => {
          return (
            <section key={deporte.id}>
              <h2>{deporte.name}</h2>
              <img src={deporte.img} alt={deporte.name} />
              <br />
              <Link to={deporte.path}>
                <button>Seleccionar</button>
              </Link>
            </section>
          );
        })}
      </div>
    </div>
  );
};