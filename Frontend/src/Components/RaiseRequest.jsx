import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function RaiseRequest() {
    const userName = localStorage.getItem("userName");

    const [description, setDescription] = useState("");
    const [details, setDetails] = useState("");

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        var userName = localStorage.getItem("userName");
        if (userName == null || userName == "admin") {
            navigate('/AccessDenied')
        }
    })

    const handleRaiseRequest = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            var res = await axios.post("https://localhost:5193/api/ITSRPAPI/CreateNewSerRequest", {
                description,
                details,
                raisedBy: userName,
                justification: "string",
            });
            console.log(res);
            setMessage(`Request Added Successfully.Your Request Id is ${res.data.requestId}`);
        } catch (e) {
            console.log(e.response);
        }
    }

  return (
      <div className='mx-5 mt-3 d-flex flex-column'>
          <h2>Welcome, {userName}</h2>
          <h4 className='mt-2 mb-4'>Raise New Request</h4>
          <form className='d-flex flex-column' onSubmit={handleRaiseRequest}>
              <span>Desciption</span>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required maxLength='50'></input>
              <span>Details</span>
              <textarea rows='3' cols='5' value={details} onChange={(e) => setDetails(e.target.value)} required maxLength='100'></textarea>
              <button type='submit' className='mt-4 col-1 mb-2'>Save</button>
          </form>
          <p className='text-primary fs-3'>{message}</p>
          <Link to='/'>Back to List</Link>
      </div>
  );
}

export default RaiseRequest;