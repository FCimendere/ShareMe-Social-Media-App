import React, { useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';


import Login from "./components/Login";
import Home from "./container/Home";



const App = () =>  {

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        let user = null;
        
        if (storedUser && storedUser !== 'undefined') {
            try {
                user = JSON.parse(storedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.clear();
            }
        } else {
            localStorage.clear();
        }
        if (!user) navigate('/login');
    }, [navigate]);

    return(
    //    <h1 className="text-3xl font-bold underline">Hello World!</h1>
    <Routes>
        < Route path="login" element={< Login />} />
        < Route path="/*" element={< Home />} />
    </Routes>
    )
}

export default App; 