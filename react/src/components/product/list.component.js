import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
export default function List() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
      setProducts(data);
    });
  };
  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure to cancel your tickets?",
      text: "The refund process will be initiated within 24 hours for all successful return/refund requests",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      return result.isConfirmed;
    });
    if (!isConfirm) {
      return;
    }
    await axios
      .delete(`http://localhost:8000/api/products/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchProducts();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link
            className="btn btn-primary mb-2 float-end"
            to={"/product/create"}
          >
            Make New Booking
          </Link>
          <button className="booknow" style={{ borderRadius:5 }}>
            <a href="http://localhost:3001">
              Go to Movie Homepage
            </a>
          </button>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Movie Title</th>
                    {/* <th>Date</th> */}
                    <th>Email</th>
                    <th>Ticket</th>
                    <th>Date & Time</th>
                    {/* <th>Image</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    products.map((row, key) => (
                      <tr key={key}>
                        <td>{row.title}</td>
                        {/* <td>{row.description}</td> */}
                        <td>{row.email}</td>
                        <td>{row.ticket}</td>
                        <td>{row.time}</td>
                        {/* <td>
                          <img
                            width="50px"
                            src={`http://localhost:8000/storage/product/image/${row.image}`}
                          />
                        </td> */}
                        <td>
                          <Link
                            to={`/product/edit/${row.id}`}
                            className="btn btn-success me-2"
                          >
                            Update Booking
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => deleteProduct(row.id)}
                          >
                            Cancel Booking
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}