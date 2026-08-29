import { useNavigate } from 'react-router-dom';
function AccessDenied() {
    const navigate = useNavigate();
    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <h1>You are not authorized to access this page.</h1>
            <button className='mt-2 btn btn-primary link-hover' onClick={()=> navigate('/Login')}>Click for Login</button>
        </div> 
    );
}

export default AccessDenied;