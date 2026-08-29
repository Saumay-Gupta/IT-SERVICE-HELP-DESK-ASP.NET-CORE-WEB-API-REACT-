import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SearchRequest() {
    const [requesterName, setRequesterName] = useState("");
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        var userName = localStorage.getItem("userName");
        if (userName == null || userName != "admin") {
            navigate('/AccessDenied')
        }
    })

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

    const handleSearchReq = async (e) => {
        e.preventDefault();

        try {
            setMessage("");

            var res = await axios.get(
                "https://localhost:5193/api/ITSRPAPI/GetRequestByuserName",
                {
                    params: {
                        userName: requesterName,
                    }
                }
            );

            console.log(res);
            setData(res.data);
        }
        catch (err) {
            if (err.response && err.response.status === 404) {
                setMessage("No Service Request available");
                setData([]);
            }
        }
    }

    return (
        <div className='ms-3 mt-4'>
            <h2>Search Requests</h2>

            <form onSubmit={handleSearchReq}>
                <p>
                    Enter Requester Name:
                    <input className='ms-2' value={requesterName} onChange={(e) => setRequesterName(e.target.value)} maxLength='20' required/>
                </p>

                <button type='submit'>Search</button>
            </form>

            <p>{message}</p>

            {data.length > 0 && (
                <div className='mx-3 border border-3 border-success rounded overflow-hidden'>
                    <table className="mb-0 table table-bordered border-danger table-hover">
                        <thead>
                            <tr>
                                <td>Request ID</td>
                                <td>Description</td>
                                <td>Details</td>
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
                                    <td>{item.details}</td>
                                    <td>{item.raisedBy}</td>
                                    <td>{item.raisedOn}</td>

                                    <td>
                                        {item.reqStatus === 1
                                            ? "New"
                                            : "Closed"}
                                    </td>

                                    <td>
                                        {item.reqStatus === 1 && (
                                            <button className='btn btn-link' onClick={() => handleCloseReq(item.requestId)}>Close Request</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SearchRequest;