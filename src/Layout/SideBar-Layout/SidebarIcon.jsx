import React, { useContext, useState } from 'react';
import { Image } from '../../AbstractElements';
import CheckContext from '../../_helper/customizer/index';
// import logo from '../../assets/images/logo/small-logo.png';
// import logo1 from '../../assets/images/logo/small-white-logo.png';

const logo = require("../../assets/images/logo.jpg")


const SidebarIcon = () => {
  const { toggleSidebar } = useContext(CheckContext);
  const [toggle, setToggle] = useState(false);
  const openCloseSidebar = () => {
    setToggle(!toggle);
    toggleSidebar(toggle);
  };
  return (
    <div className="logo-wrapper" style={{display:"flex" , alignItems:"center" , justifyContent:"center"}}>
      {/* <Image attrImage={{ className: 'img-fluid for-light', src: `${logo}`, alt: '' , }} /> */}
      <img src={logo} style={{width:"70%" , height:"70%" , backgroundSize:"cover" , backgroundRepeat:"no-repeat" , backgroundPosition:"center" }}/>
      <Image attrImage={{ className: 'img-fluid for-dark', src: `${logo}`, alt: '' }} />
      <div className='back-btn' onClick={() => openCloseSidebar()}><i className='fa fa-angle-left'></i></div>
    </div>
  );
};
export default SidebarIcon;