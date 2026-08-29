
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            await axios.get(
                "https://localhost:5193/api/ITSRPAPI/Authenticate",
                {
                    params: {
                        userName: userName,
                        Password: password
                    }
                }
            );
            if (userName == "admin") {
                navigate('/admin');
                localStorage.setItem("userName", "admin");
            }
            else {
                localStorage.setItem("userName", userName);
                navigate('/');
            }
        }
        catch (err) {
            if (err.response && err.response.status === 404) {
                setErrorMessage("Username or Password is incorrect !!");
            }
            else {
                console.log(err);
            }
        }
    }

    return (
        <div className='d-flex flex-column ms-5'>
            <h1 className=' mt-5 mb-5 text-success'>USER LOGIN</h1>

            <form className='d-flex flex-column w-50 border border-3 border-success' onSubmit={handleLogin}>
                <div className='d-flex w-75 ms-3 mt-4 justify-content-between'>
                    <p>UserName</p>
                    <input type="text" maxLength="20" required className='h-25' value={userName} onChange={(e) => setUserName(e.target.value)} ></input>
                </div>
                <div className='d-flex w-75 ms-3 mt-2 justify-content-between'>
                    <p>Password</p>
                    <input type="password" minLength="8" maxLength="20" required className='h-25' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>

                <button className='p-2 ms-3 btn btn-success mb-4 mt-2 w-25' type="submit">LOGIN</button>

                <p className="text-danger ms-3 mt-2 mb-4">{errorMessage}</p>
            </form>
      </div>
  );
}

export default Login;