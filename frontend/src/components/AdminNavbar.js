import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { MdFingerprint} from 'react-icons/md'
import { FaAtlassian } from 'react-icons/fa'
import {FaBars, FaTimes} from 'react-icons/fa'
import { Button } from './Button'
import './Navbar.css'
import { IconContext } from 'react-icons/lib'

function AdminNavbar() {

    const [click, setClick] = useState(false);
    
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () =>{
        if(window.innerWidth <= 960) {
            setButton(false); 
        } else {
            setButton(true);
        }
    }

    window.addEventListener('resize', showButton);


    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
          <div className="navbar">
              <div className="navbar-container container">
                  <Link to="/Admin" className="navbar-logo" onClick={closeMobileMenu}>
                      { <FaAtlassian className='navbar-icon' /> }
                      Mini Bank
                  </Link>
                  <div className="menu-icon" onClick = {handleClick}>
                      {click ? <FaTimes /> : <FaBars />} 
                 </div>
                 <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to= '/bank-details' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li> 
                    <li className='nav-item'>
                        <Link to= '/users' className='nav-links' onClick={closeMobileMenu}>
                            Users
                        </Link>
                    </li> 
                    <li className='nav-item'>
                        <Link to= '/admin-transfer-credit' className='nav-links' onClick={closeMobileMenu}>
                            Credit
                        </Link>
                    </li> 
                    <li className='nav-item'>
                        <Link to= '/admin-transfer-debit' className='nav-links' onClick={closeMobileMenu}>
                            Debit
                        </Link>
                    </li> 
                 </ul>
              </div>
          </div>
          </IconContext.Provider>
        </>
    )
}

export default AdminNavbar