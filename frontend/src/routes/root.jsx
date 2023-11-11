import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Tickets ciudad universitaria UNACH</h1>
        <div>
        <form method="post">
            <a href="/registro">
           <button type="button">Registro</button>
           </a>
       </form>
          <form method="post">
            <a href="/login">
           <button type="button">Login</button>
           </a>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/plantasElectricas`}>Plantas electricas</a>
            </li>
            <li>
              <a href={`/seguridad`}>Seguridad</a>
            </li>
            <li>
              <a href={`/jardineria`}>Jardineria</a>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </>
  );
}