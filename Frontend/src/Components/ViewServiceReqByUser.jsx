import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
function ViewServiceReqByUser() {

    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");

    const userName = localStorage.getItem("userName");

    const navigate = useNavigate();
    useEffect(() => {

        var userName = localStorage.getItem("userName");
        if (userName == null || userName == "admin") {
            navigate('/AccessDenied')
        }

        const getRequests = async () => {
            try {
                setMessage("");
                var res = await axios.get(
                    "https://localhost:5193/api/ITSRPAPI/GetRequestByuserName",
                    {
                        params: {
                            userName: userName,
                        }
                    }
                );

                console.log(res);
                setData(res.data);
            }
            catch (err) {
                if (err.response && err.response.status === 404) {
                    setMessage("No Service Request available");
                }
            }
        };

        getRequests();
    }, [userName]);

    return (
        <div className='mx-5 mt-3'>
            <h2>Welcome, {userName}</h2>
            <Link to='/RaiseRequest'>Raise New Request</Link>

            <p>{message}</p>

            {message.length <= 0 && < div className='border border-3 border-success rounded overflow-hidden'>
                <table className="mt-2 table table-bordered border-danger table-hover">
                    <thead>
                        <tr>
                            <td>Request ID</td>
                            <td>Description</td>
                            <td>Requested By</td>
                            <td>Creation Date</td>
                            <td>Request Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.requestId}>
                                <td>{item.requestId}</td>
                                <td>{item.description}</td>
                                <td>{item.raisedBy}</td>
                                <td>{item.raisedOn}</td>
                                <td>{(item.reqStatus == 1 ? "New" : "Closed")}</td>
                                <td>{(item.reqStatus == 1 ? <Link to={`/DeleteReq/${item.requestId}`}>Delete</Link> : <Link to={`/ReOpenReq/${item.requestId}`}>Re-Open</Link>)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
        
  );
}

export default ViewServiceReqByUser;