import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as React from 'react';

import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

export const  CheckRoute= ({ autenticado, children })=>{
    console.log("recebido no compnente: "+ autenticado,children);
 
    // seu código para autenticação e checar se o usuário pode usar essa rota
    const user = { admin: true }

    return (!user.admin || ( user.admin && autenticado)) ? children : <Navigate to="/login"/>

}
