import React from 'react';
import HamburgerButton from './HamburgerButton';
import Logo from './Logo';
import Search from './Search';
//import SearchResults from './SearchResults';

const TopBar = () => {

    return(
        <div className="top row">
            <HamburgerButton />
            <Logo />
            <Search />
        </div>
    )
}

export default TopBar;