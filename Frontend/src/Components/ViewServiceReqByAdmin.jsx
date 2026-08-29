import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
function ViewServiceReqByAdmin() {

    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        var userName = localStorage.getItem("userName");
        if (userName == null || userName != "admin") {
            navigate('/AccessDenied')
        }
        const getRequests = async () => {
            try {
                setMessage("");
                var res = await axios.get(
                    "https://localhost:5193/api/ITSRPAPI/GetAllRequest",
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
    }, []);

    const handleCloseReq = async (requestId) => {
        try {
            var res = await axios.get(
                "https://localhost:5193/api/ITSRPAPI/CloseRequest",
                {
                    params: {
                        id: requestId
                    }
                }
            );
            console.log(res);
            setData(prevData =>
                prevData.map(item =>
                    item.requestId === requestId
                        ? { ...item, reqStatus: 2 }
                        : item
                )
            );
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='mx-5 mt-3'>
            <h2>Welcome admin</h2>
            <Link to='/SearchRequest'>Search Requests</Link>

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
                                <td>{(item.reqStatus == 1 ? <button className='btn btn-link' onClick={() => handleCloseReq(item.requestId)}>Close Request</button> : " ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>

    );
}

export default ViewServiceReqByAdmin;