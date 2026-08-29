import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function ReOpenReq() {
    const { requestId } = useParams();
    const [data, setData] = useState(null);
    const [justification, setJustification] = useState("");
    const navigate = useNavigate();
    useEffect(() => {

        var userName = localStorage.getItem("userName");
        if (userName == null || userName == "admin") {
            navigate('/AccessDenied')
        }

        const getRequests = async () => {
            try {
                var res = await axios.get(
                    "https://localhost:5193/api/ITSRPAPI/GetRequestById",
                    {
                        params: {
                            reqId: requestId,
                        }
                    }
                );
                console.log(res.data);
                setData(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getRequests();
    }, [requestId]);

    const handleReOpenReq = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.post(
                "https://localhost:5193/api/ITSRPAPI/reopen",
                {
                    requestId,
                    description: data.description,
                    details: data.details,
                    raisedBy: data.raisedBy,
                    raisedOn: data.raisedOn,
                    justification,
                }
            );
            console.log(res.data);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='mx-3 mt-4'>
            <h3>Welcome</h3>
            <p className='fs-3'>Re-Open Request</p>
                <form onSubmit={handleReOpenReq}>
                    <div className='border border-success border-3 rounded'>
                        <table className='mb-0 table table-bordered border-danger table-hover'>
                            <tbody>
                                <tr>
                                    <td>Description</td>
                                    <td><input value={data?.description ?? ""} readOnly></input></td>
                                </tr>
                                <tr>
                                    <td>Details</td>
                                    <td><textarea value={data?.details ?? ""} readOnly></textarea></td>
                                </tr>
                                <tr>
                                    <td>Creation Date</td>
                                    <td>{data?.raisedOn ?? ""}</td>
                                </tr>
                                <tr>
                                    <td>Justification</td>
                                    <td><textarea value={justification} onChange={(e) => setJustification(e.target.value)} rows='4' required maxLength='50'></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type='submit' className='mt-1'>ReOpen Request</button>
            </form>
            <Link to='/'>Back to List</Link>
        </div>
  );
}

export default ReOpenReq;