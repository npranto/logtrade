import React, { Component } from "react";
import { RiMenuFill, RiCloseFill } from 'react-icons/ri';
import { getRandomAvatar } from "./utils/avatars";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.setState({ isOpen: true });
  }

  closeMenu() {
    this.setState({ isOpen: false });
  }

  render() {
    if (this.state.isOpen) {
      return <NavMenu {...this.props} closeMenu={this.closeMenu} />;
    }

    return (
      <button 
        type="button" 
        className="flex justify-center rounded-md p-2 text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm fixed top-0 left-0 z-10 bg-transparent" onClick={() => this.openMenu()}
      >
        <RiMenuFill size="1.5rem" style={{ color: 'black' }} />
      </button>
    )
  }
};

const NavMenu = (props) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity shadow-lg" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="relative w-52 bg-white text-black px-4 py-4" style={{ width: '100%', maxWidth: '300px', height: '100%' }}>

        <button 
          type="button" 
          className="absolute flex justify-center rounded-md px-1 py-1 text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm fixed top-0 right-0 z-10 bg-transparent" onClick={props.closeMenu}
        >
          <RiCloseFill size="1.5rem" style={{ color: 'black' }} />
        </button>
        
        <div className="flex flex-col py-2">
          <div className="avatar w-24 sm:w-40">
            <img src={getRandomAvatar()} alt="Avatar" style={{ maxWidth: '100%', height: 'auto', borderRadius: '1em' }} />
          </div>
          <h3 className="name text-xl sm:text-2xl font-bold text-gray-400 mt-2"> {'Nazmuz Pranto'} </h3>
        </div>

        <ul className="menu py-2">
          {!props.isLoggedIn && (
          <li className="item pt-1">
            <a href="/home" type="button" className={`${props.activePage === 'home' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold`}>Home</a>
          </li>
          )}

          {!props.isLoggedIn && (
          <li className="item pt-1">
            <a href="/login" type="button" className={`${props.activePage === 'login' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold`}>Login</a>
          </li>
          )}

          {!props.isLoggedIn && (
          <li className="item pt-1">
            <a href="/signup" type="button" className={`${props.activePage === 'signup' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold`}>Sign Up</a>
          </li>
          )}

          {props.isLoggedIn && (
          <li className="item pt-1">
            <a href="/" type="button" className={`${props.activePage === 'dashboard' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold`}>Dashboard</a>
          </li>
          )}

          {props.isLoggedIn && (
          <li className="item pt-1">
            <a href="/account" type="button" className={`${props.activePage === 'account' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold`}>Account</a>
          </li>
          )}

          {props.isLoggedIn && (
          <li className="item pt-1">
            <a href="/home" type="button" className={`${props.activePage === 'home' ? 'text-black' : 'text-gray-400'} hover:text-black hover:font-bold`}>Logout</a>
          </li>
          )}
       </ul>
        
      </div>
    </div>
  );
}

export default Nav;