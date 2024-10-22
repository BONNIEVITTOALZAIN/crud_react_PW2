import React, {Suspense} from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom'
import './App.css'


const Home = React.lazy(()=> import("./component/Home"));
const ListFa = React.lazy(()=> import("./component/fakultas/List"));
const ListPro = React.lazy(()=> import("./component/prodi/List"));
const CreateFakultas = React.lazy(() => import("./component/fakultas/Create"));
const CreateProdi = React.lazy(() => import("./component/prodi/Create"));
const FakultasEdit = React.lazy(() => import("./component/fakultas/Edit"));
const ProdiEdit = React.lazy(() => import("./component/prodi/Edit"));




function App() {

  return (
    <>
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">MDP</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
               </button>
         <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
            <li className="nav-item">
               <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({isActive}) =>
                `nav-link ${isActive ? "active" : " "}` 
              } to="/fakultas">Fakultas</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({isActive}) =>
                `nav-link ${isActive ? "active" : " "}` 
              } to="/prodi">Prodi</NavLink>
            </li>
      </ul>
    </div>
  </div>
</nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fakultas" element={<ListFa />} />
          <Route path="/prodi" element={<ListPro />} />
          <Route path="/fakultas/create" element={<CreateFakultas/>} />
          <Route path="/prodi/create" element={<CreateProdi/>} />
          <Route path="/fakultas/edit/:id" element={<FakultasEdit/>}></Route>  
          <Route path="/prodi/edit/:id" element={<ProdiEdit/>}></Route>  
        </Routes>
      </Suspense>
    </Router>
    </>
  )
}

export default App
