import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Col, Row, Container} from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct'

export default function AdminView({ productsData, fetchData }) {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(productsData);
	},[productsData]);

	return (

	<Container>
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <Row>
        <Col>
          <div className="table-responsive">
            <div style={{ maxHeight: '600px', overflow: 'auto' }}>
              <Table striped bordered hover>
                <thead>
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td className={product.isActive ? 'text-success' : 'text-danger'}>
                        {product.isActive ? 'Available' : 'Unavailable'}
                      </td>
                      <td>
                        <EditProduct product={product._id} fetchData={fetchData} />
                      </td>
                      <td>
                        <ArchiveProduct productId={product._id} isActive={product.isActive} fetchData={fetchData} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

	)
} 	