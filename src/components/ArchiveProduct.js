import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ productId, isActive, fetchData }) {
  const handleArchive = () => {
    fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}/archive`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if(data === true) {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Product Successfully Archived'
        })
        
        fetchData();
      } else {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'Please try again'
        })
        
        fetchData();
      }
    })

  };

  const handleActivate = () => {

    fetch(`${ process.env.REACT_APP_API_URL }/products/${productId}/activate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if(data === true) {
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Product Successfully Activated'
        })
      
        fetchData();
      } else {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: 'Please try again'
        })
        
        fetchData();
      }
    })


  };

  return (
    <div>
      {isActive ? (
        <Button variant="danger" onClick={handleArchive}>
          Archive
        </Button>
      ) : (
        <Button variant="success" onClick={handleActivate}>
          Activate
        </Button>
      )}
    </div>
  );
}
