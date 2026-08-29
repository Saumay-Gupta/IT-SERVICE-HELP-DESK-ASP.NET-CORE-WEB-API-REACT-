import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
function DeleteReq() {
    const { requestId } = useParams();
    const [data, setData] = useState(null);
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

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            var res = await axios.delete(
                "https://localhost:5193/api/ITSRPAPI/Delete",
                {
                    params: {
                        id:requestId,
                    }
                }
            );
            console.log(res.data);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className='mx-3 mt-5 d-flex flex-column'>
            <h3>Are you sure you want to delete this?</h3>
            <div className='border border-success border-3 rounded'>
                <table className='mb-0 table table-bordered border-danger table-hover'>
                    <thead>
                        <tr>
                            <td>Description</td>
                            <td>Details</td>
                            <td>Creation Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data?.description ?? ""}</td>
                            <td>{data?.details ?? ""}</td>
                            <td>{data?.raisedOn ?? ""}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className='col-2 mt-4' onClick={handleDelete}>Delete Request</button>
            <Link to='/'>Back to List</Link>
        </div>
  );
}

export default DeleteReq;