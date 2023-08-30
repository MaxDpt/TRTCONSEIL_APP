import React from 'react';
import GlobalStyle from "../style/GlobalStyle";
import Header from "./header/Header";
import {getUser} from "../requetes/user_request";
import ('../style/App.css');
import ('../style/Header.css');
import ('../style/Home.css');
import ('../style/Login.css');
import ('../style/Registration.css');
import ('../style/BackOffice.css');
import ('../style/BackOffice_mobile.css');
import ('../style/Advertisements.css')
import ('../style/Advetisements_mobile.css')
import ('../style/Profil.css')
import ('../style/Profil_mobile.css')
import ('../style/Stores.css')
import ('../style/Stores_mobile.css')
import ('../style/Users.css')
import ('../style/Users_mobile.css')


    export default function Layout({children}) {
        return (
        <body>
            <GlobalStyle />
            <Header getUser = {getUser}/>
            {children} 
        </body>
        );
    };