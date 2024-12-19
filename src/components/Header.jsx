import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav className='navbar' >
        <h2 className='title'>Urban Style</h2>
        <div className='button-group'>
        <Link to="/" ><button className='btn btn-outline-dark'>Home</button></Link>
        <Link to="/cart" ><button className='btn btn-outline-dark'><FaShoppingCart style={{ marginRight: '7px' }} />Cart</button></Link>
        {token ? (
          <button onClick={handleLogout} className='btn btn-outline-danger'>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className='btn btn-outline-success'>
              Login
            </button>
          </Link>
        )}
        </div>
      </nav>
    </div>
  )
}

export default Header