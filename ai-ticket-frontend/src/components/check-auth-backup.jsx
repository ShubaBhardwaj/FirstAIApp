import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"

function CheckAuth({children, protecteRoute}) {
    const navigate = useNavigate()
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem("token");

        if(protecteRoute){
            if(!token){
                navigate("/login");
            }else{
                setLoading(false);
            }
        }else{
            if (token) {
                navigate("/")
            }else{
                setLoading(false)
            }
        }
    },[navigate, protecteRoute]);

    if (loading) {
        return <div>Loading...</div>
    }
    return children;
}

export default CheckAuth