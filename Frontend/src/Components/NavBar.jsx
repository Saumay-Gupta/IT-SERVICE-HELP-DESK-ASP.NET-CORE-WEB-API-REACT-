import { Outlet, useNavigate } from 'react-router-dom'
function NavBar() {
    const navigate = useNavigate();
    return (
        <>
        <div className='d-flex w-100 bg-success h-50 position-relative justify-content-center align-items-center'>
                <h2>Your One Stop Web Site For All Service Requests!</h2>
                <button className='position-absolute end-0 me-3' onClick={() => { navigate('/Login'); localStorage.clear() }}>Logout</button>
        </div>
        <Outlet/>
        </>
  );
}

export default NavBar;