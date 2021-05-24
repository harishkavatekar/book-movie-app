import React from 'react';
import './Header.css';
import logoIcon from '../../assets/logo.svg';

const Header = function(){
    return (
        <div className="header">
            <div className="logo">
                <img src={logoIcon} className="logo-icon"/>
            </div>
        </div>
    )
}


export default Header;