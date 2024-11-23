// import { useEffect, useState } from "react";
// import UserService from '../../services/UserService.js';
// import Table from "../Table.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Bikes = () => {
//   const [bikes, setBikes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const getAllBikes = () => {
//     setLoading(true);
//     UserService.fetchBikesForUser()
//       .then(res => {
//         setBikes(res.data.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     getAllBikes();
//   }, []);

//   const fields = [
//     { name: 'id', label: 'Id' },
//     { name: 'name', label: 'Name' },
//     { name: 'manufacturer', label: 'Manufacturer' },
//     { name: 'year', label: 'Year' },
//     { name: 'createdAt', label: 'Creation Time' }
//   ];

//   return (
//     <div className="container mt-5 mb-5">
//       <div className="card p-5 shadow-sm bg-light">
//         <h1 className="mb-4 text-center text-primary fw-bold">User's Bikes</h1>
//         <div className="d-flex justify-content-end mb-4">
//           <a className="btn btn-success" href="/bikes/create">Add New Bike</a>
//         </div>
//         {loading ? (
//           <div className="d-flex justify-content-center">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : (
//           <div className="table-responsive">
//             <Table caption="Bikes" fields={fields} rows={bikes} resourceName="bikes" />
//           </div>
//         )}
//         <div className="d-flex justify-content-end mt-4">
//           <button type="button" className="btn btn-primary" onClick={getAllBikes}>Refresh</button>
//         </div>
//         {error && <p className="text-danger mt-3">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Bikes;


import { useEffect, useState } from "react";
import UserService from '../../services/UserService.js';
import AuthService from '../../services/AuthService.js';
import Table from "../Table.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const getAllBikes = () => {
    setLoading(true);
    UserService.fetchBikesForUser()
      .then(res => {
        setBikes(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          setShowLoginPrompt(true);
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      getAllBikes();
    } else {
      setShowLoginPrompt(true);
    }
  }, []);

  const fields = [
    { name: 'id', label: 'Id' },
    { name: 'name', label: 'Name' },
    { name: 'manufacturer', label: 'Manufacturer' },
    { name: 'year', label: 'Year' },
    { name: 'createdAt', label: 'Creation Time' }
  ];

  const handleClose = () => {
    setShowLoginPrompt(false);
    window.location.href = '/login';
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card p-5 shadow-sm bg-light">
        <h1 className="mb-4 text-center text-primary fw-bold">User's Bikes</h1>
        <div className="d-flex justify-content-end mb-4">
          <a className="btn btn-success" href="/bikes/create">Add New Bike</a>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <Table caption="Bikes" fields={fields} rows={bikes} resourceName="bikes" />
          </div>
        )}
        <div className="d-flex justify-content-end mt-4">
          <button type="button" className="btn btn-primary" onClick={getAllBikes}>Refresh</button>
        </div>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>

      {/* Login Prompt Modal */}
      <div className={`modal fade ${showLoginPrompt ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login Required</h5>
            </div>
            <div className="modal-body">
              <p>Please login to see the bike list.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleClose}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bikes;
