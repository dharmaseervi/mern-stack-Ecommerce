'use client'
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
    const [globalVariable, setGlobalVariable] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);
    const [cartForceUpdate, setCartForceUpdate] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [genderSelected, setGenderSelected] = useState('');
    const { data: session } = useSession();
    const userId = session?.user?._id || '';
    const [isSearchOpen, setIsSearchOpen] = useState(false);
   




    return (
        <GlobalContext.Provider value={{ isSearchOpen, setIsSearchOpen, globalVariable, setGlobalVariable, forceUpdate, setForceUpdate, cartForceUpdate, setCartForceUpdate, userId, genderSelected, setGenderSelected, menuOpen, setMenuOpen }}>
            {children}
        </GlobalContext.Provider>
    );
};


