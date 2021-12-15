import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const states = useSelector(state=>state.SpendState);
    const formatter = (x) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(x);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top topmenu">
            <div className="container">
            <Link to="/" className="navbar-brand">Home</Link>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </li>
            <li className="nav-item">
                <Link to="/cart" className="nav-link">Cart</Link>
            </li>
            </ul>
        </div>
        <div className="float-right">
        <button className="navbar-toggler mx-1" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/cart" className="btn btn-outline-success btn-sm">Cart&nbsp;<span className="badge badge-light">{states.cart.length}</span></Link>
            &nbsp;<small>Bakiye:<b>{formatter(states.balance)}</b></small>
        </div>
            </div>
        </nav>
    )
}

export default Navbar
