import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart, incrementQuantity,decrementQuantity } from "../redux/slice";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const product = useSelector((state) =>
        state.products.products.find((p) => p.id === parseInt(id))
    );

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (product && quantity < product.stock) {
            setQuantity(quantity + 1);
            dispatch(incrementQuantity({ id: product.id }));
        }
    };
    
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(decrementQuantity({ id: product.id }));
        }
    };

    const handleAddToCart = () => {
        if (product && product.stock >= quantity) {
            dispatch(addToCart({ id: product.id, quantity }));
            navigate("/cart"); 
        } else {
            alert("Stok tidak mencukupi!");
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container row " style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto", marginTop: "5px", height: "90vh",}}>
            <div className="col-md-4 py-5">
                <img
                    src={product.image}
                    className="img-fluid"
                    alt={product.title}
                    height="350px"
                    width="350px"
                />
            </div>
            <div className="col-md-6">
                <h4 className="text-uppercase text-black-50">{product.category}</h4>
                <h1 className="display-5">{product.title}</h1>
                <h3 className="display-6 fw-bold my-4">${product.price}</h3>
                <p>Stok: {product.stock}</p>
                <h3 className="">PRODUCT DETAILS</h3>
                <p className="lead">{product.description}</p>
                <div className="d-flex align-items-center">
                    <button className="btn btn-dark me-3" onClick={handleDecrement}> - </button>
                    <span>{quantity}</span>
                    <button className="btn btn-dark ms-3" onClick={handleIncrement}> + </button>
                </div>
                <button className="btn btn-outline-dark mt-3" onClick={handleAddToCart}> Add To Cart </button>
            </div>
        </div>
    );
};

export default ProductDetail;
