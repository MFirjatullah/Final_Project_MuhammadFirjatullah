import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, checkOut, removeFromCart } from "../redux/slice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.products.cart);
    const [error, setError] = useState(null); 

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleIncrement = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem.quantity < cartItem.stock) { 
            dispatch(incrementQuantity({ id }));
            setError(null); 
        } else {
            setError(`Quantity untuk ${cartItem.title} melebihi stok `);
        }
    };

    const handleDecrement = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem.quantity > 1) {
            dispatch(decrementQuantity({ id }));
            setError(null); 
        }
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart({ id })); 
    };

    const handleCheckout = () => {
        dispatch(checkOut()); 
        navigate("/"); 
    };

    return (
        <div className="container mt-5">
            <h1 style={{textAlign:"center"}}>Keranjang Belanja</h1>
            {cart.length === 0 ? (
                <p style={{textAlign:"center"}}>Keranjang Anda kosong. Tambahkan beberapa produk!</p>
            ) : (
                <>
                    {error && <div className="alert alert-danger">{error}</div>} 

                    <table className="table table-border mt-4">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th></th>
                                <th></th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={item.image} alt={item.title} width="50" />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-sm btn-dark m-1 " onClick={() => handleDecrement(item.id)}> - </button>
                                        {item.quantity}
                                        <button className="btn btn-sm btn-dark m-1" onClick={() => handleIncrement(item.id)}> + </button>
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)}> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-3 d-flex justify-content-between">
                        <h4>Total: ${totalPrice.toFixed(2)}</h4>
                        <button className="btn btn-success" onClick={handleCheckout}> Checkout </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
