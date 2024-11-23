import { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import UserService from '../../services/UserService.js';
import ComponentTable from "../ComponentTable.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const BikeComponents = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { bikeId } = useParams();
  const location = useLocation();

  const getAllComponents = () => {
    setLoading(true);
    UserService.fetchComponentsForBike(bikeId)
      .then(res => {
        setComponents(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllComponents();
  }, [bikeId]);

  useEffect(() => {
    if (location.state?.refresh) {
      getAllComponents();
    }
  }, [location.state]);

  const fields = [
    { name: 'id', label: 'Id' },
    { name: 'name', label: 'Name' },
    { name: 'manufacturer', label: 'Manufacturer' },
    { name: 'price', label: 'Price' },
    { name: 'quality', label: 'Quality' },
    { name: 'createdAt', label: 'Creation Time' }
  ];

  return (
    <div className="container mt-5 mb-5">
      <div className="card p-5 shadow-sm bg-light">
        <h1 className="mb-4 text-center text-primary fw-bold">Bike's Components</h1>
        <div className="d-flex justify-content-end mb-4">
          <a className="btn btn-success" href={`/bikes/${bikeId}/components/create`}>Add New Component</a>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <ComponentTable caption="Components" fields={fields} rows={components} resourceName="components" />
          </div>
        )}
        <div className="d-flex justify-content-end mt-4">
          <button type="button" className="btn btn-primary" onClick={getAllComponents}>Refresh</button>
        </div>
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default BikeComponents;
