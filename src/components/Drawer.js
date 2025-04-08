import React, { useState } from 'react'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Home, CreateSharp, FactCheck , Info , AccountCircle ,Instagram  } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const Drawer = () => {
  const [show, setShow] = useState(false);
  const handleDraw = () => {
    setShow(!show);
  }

  return (
    <section className="drawer">
      <ListOutlinedIcon className="menu"
        style={{ fontSize: "36px" }}
        onClick={handleDraw} />

      <section className={`overlay ${show ? 'add' : 'remove'}`}>
        <CloseOutlinedIcon className="close"
          style={{ fontSize: "36px" }}
          onClick={handleDraw} />
          <ul>
            <li>
              <Home />
              <Link to="/" className='link'>HOME</Link>
            </li>
            <li>
              <CreateSharp className='logo'/>
              <Link to="/making" className='link'>MAKE</Link>
            </li>
            <li>
              <FactCheck className='logo'/>
              <Link to="/todo" className='link'>TODO</Link>
            </li>
            <li>
              <AccountCircle className='logo'/>
              <Link to="/signup" className='link'>SIGNUP</Link>
            </li>
            <li>
              <Info className='logo'/>
              <Link to="/info" className='link'>INFO</Link> 
            </li>
            <li>
              <Instagram className='logo'/>
              <a href="https://www.instagram.com/mikann.code/?hl=ja" className='link'>Instagram</a>
            </li>
          </ul>
      </section>
    </section>
  )
}
