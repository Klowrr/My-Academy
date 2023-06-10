import { Icon } from '@iconify/react';
import { NavLink, Outlet} from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';
const Sidebar = () =>{
  return (
    <div className='App'>
      <div className="sidebar">
        <h1>ACADEMY</h1>
        <hr/>
        <div  className="sidebar-item">
          <motion.div whileTap={{scale:0.8}} >
            <NavLink to="Todo" style={{display:'block'}}
            className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "item active" : "item"}>
              <Icon icon="mdi:to-do" style={{ fontSize: '24px' }}/>
              <p>To Do</p>
            </NavLink>
          </motion.div >
          
          <motion.div whileTap={{scale:0.8}}>
            <NavLink to="LogBook" style={{display:'block'}}
            className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "item active" : "item"}>
              <Icon icon="ph:book-bold" style={{ fontSize: '24px' }}/>
              <p>Log Book</p>
            </NavLink>
          </motion.div>
          
          <motion.div whileTap={{scale:0.8}}>
            <NavLink to="Resource" style={{display:'block'}}  
            className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "item active" : "item"}>
              <Icon icon="iconoir:multiple-pages-empty" style={{ fontSize: '24px' }}/>
              <p>Resource</p>
            </NavLink>
          </motion.div>
          
        </div>
      </div>
      <div className='content'>
          <Outlet/>
      </div>
    </div>
  )
}
export default Sidebar;