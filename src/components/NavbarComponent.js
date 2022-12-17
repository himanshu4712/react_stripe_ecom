import { useState, useContext } from 'react';
import { Button, Navbar, Modal } from "react-bootstrap";
import { CartContext } from "../CartContext";
import CartProduct from './CartProduct';

function NavbarComponent() {
    
    const cart = useContext(CartContext);
    const [ show, setShow ] = useState(false);
    const handleClose = () => { setShow(false) };
    const handleShow = () => { setShow(true) };

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.url) {
                window.location.assign(response.url);
            }
        });
    };

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/"> Ecommerce Store </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end" >
                    <Button onClick={handleShow} variant='primary'> Cart ({productsCount} Item) </Button>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {
                        productsCount > 0 ?
                            <>
                                <p>Items in your cart:</p>
                                { 
                                    cart.items.map((currentProduct, index) => (
                                        <CartProduct id={currentProduct.id} quantity={currentProduct.quantity} key={index}></CartProduct>
                                    )) 
                                }

                                <h2>Total: {cart.getTotalCost().toFixed(2)}</h2>

                                <Button variant="success" onClick={checkout}>Purchase item!</Button>
                            </>
                        :
                        <h2>Thre are no items in your cart!</h2>
                    }
                </Modal.Body>

            </Modal>
        </>
    )
}

export default NavbarComponent;