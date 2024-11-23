import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

const Table = ({ caption, fields, rows, resourceName }) => {
  return (
    <table className="table table-hover table-bordered">
      <caption>{caption}</caption>
      <thead className="table-dark">
        <tr>
          {fields.map((field, key) => (
            <th key={key}>
              {field.label}
              <i className="bi bi-sort-alpha-down ms-2"></i>
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {fields.map((field, fieldIndex) => (
              <td key={fieldIndex}>{row[field.name]}</td>
            ))}
            <td className="d-flex justify-content-around">
              <Link className="btn btn-info btn-sm" to={`/${resourceName}/${row.id}/update`} state={row}>
                Update
              </Link>
              <Link className="btn btn-danger btn-sm" to={`/${resourceName}/${row.id}/delete`} state={row}>
                Delete
              </Link>
              <Link className="btn btn-warning btn-sm" to={`/${resourceName}/${row.id}/components`} state={row}>
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  caption: PropTypes.string,
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  resourceName: PropTypes.string,
};

export default Table;
