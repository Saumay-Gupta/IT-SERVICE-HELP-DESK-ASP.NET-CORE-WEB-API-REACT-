import { Routes, Route} from 'react-router-dom'
import Login from "./Components/Login"
import NavBar from "./Components/NavBar"
import ViewServiceReqByAdmin from "./Components/ViewServiceReqByAdmin"
import ViewServiceReqByUser from "./Components/ViewServiceReqByUser"
import RaiseRequest from "./Components/RaiseRequest"
import ReOpenReq from "./Components/ReOpenReq"
import DeleteReq from "./Components/DeleteReq"
import SearchRequest from "./Components/SearchRequest"
import AccessDenied from './Components/AccessDenied'
function App() {

    return (
        <>
            <Routes >
                <Route element={<NavBar />}>
                    <Route path='/' element={<ViewServiceReqByUser />}></Route>

                    <Route path='/admin' element={<ViewServiceReqByAdmin />}></Route>
                    <Route path='/RaiseRequest' element={<RaiseRequest />}></Route>
                    <Route path='/ReOpenReq/:requestId' element={<ReOpenReq />}></Route>
                    <Route path='/DeleteReq/:requestId' element={<DeleteReq />}></Route>
                    <Route path='/SearchRequest' element={<SearchRequest />}></Route>
                </Route>

                <Route path='/Login' element={<Login />}></Route>
                <Route path='/AccessDenied' element={<AccessDenied/>}></Route>
            </Routes>
        </>
  )
}

export default App
