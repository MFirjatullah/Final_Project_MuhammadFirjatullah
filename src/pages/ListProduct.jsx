import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../redux/slice";

const ListProduct = () => {
  const products = useSelector((state) => state.products.products);
  const token = useSelector((state) => state.auth.token); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleAddToCart = (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    const product = products.find((p) => p.id === productId);

    if (product.stock > 0) {
      dispatch(addToCart({ id: productId, quantity: 1 }));
      alert("Produk berhasil ditambahkan ke keranjang!");
    } 
  };

  return (
    <div>
      <h2 style={{marginLeft:"30px", marginTop:"30px"}}>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="item">
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "150px", height: "200px" }}
            />
            <h5 className="text-center">{product.title}</h5>
            <div className="text-position">
              <strong className="text-uppercase text-black-50 m-3">{product.category}</strong>
              <p style={{ textAlign: "start" }}>{product.description}</p>
             <div className="mt-4">
             <Link to={`/product/${product.id}`}> 
                <button className="btn btn-primary">Details</button>
              </Link>
              <button className="btn btn-success m-1" onClick={() => handleAddToCart(product.id)} disabled={product.stock === 0} > {product.stock === 0 ? "Stok Habis" : "Add to Cart"} </button>
             </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
