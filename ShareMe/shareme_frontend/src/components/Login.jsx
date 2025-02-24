import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/LogoWhite.png';
import shareVideo from '../assets/shareMain.mp4'
import { jwtDecode } from "jwt-decode";
import { client } from '../client';


// const Login = () => {
//     //navigation hooks
//     const navigate = useNavigate();

//     const responseGoogle = (response) => {
//         // console.log(response);
//         const decoded =  jwtDecode(response.credential);
//         localStorage.setItem('user', JSON.stringify(decoded));
//         const {name,picture,sub} = decoded;
        
//         // same information from google json file to will send sanity to create user in db
//         const doc = {
//             _id: sub, // use googleID as user ID
//             _type: 'user',
//             userName: name,
//             image: picture,
//         } 
//         //if our repsonse google is successful, we will redirect to our localhost & our user will be created 
//         client.createIfNotExists(doc)
//             .then(() => {
//                 navigate('/',{replace: true}) 
//             })    
//         }
   
const Login = () => {
    //navigation hooks
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        // console.log(response);
        const decoded =  jwtDecode(response.credential);
        localStorage.setItem('user', JSON.stringify(decoded));
        const {name,picture,sub} = decoded;
        // same information from google json file to will send sanity to create user in db
        const doc = {
            _id: sub, // use googleID as user ID
            _type: 'user',
            userName: name,
            image: picture,
        } 
        //if our repsonse google is successful, we will redirect to our localhost & our user will be created 
        client.createIfNotExists(doc)
            .then(() => {
                navigate('/',{replace: true}) 
            })
              
    }

    const responseError = (error) => console.log('Login Failed:', error);

    
    
    return (
        <div className='flex justify-start items-center flex-col h-screen'>
        <div className="relative w-full h-full">
            <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="object-cover w-full h-full"
            />
            
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                <div className="p-5">
                    <img src={logo} width="130px" alt="logo"/>
                </div>
                <div className="shadow-2x1">
                    <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps)=> (
                        <button
                        type="button"
                        className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        >
                            <FcGoogle className="mr-4"/> Sign-in with Google
                        </button>
                    )}
                    onSuccess={responseGoogle}
                    onError={responseError}
                    cookiePolicy="single_host_origin"
                    />
                    {/* <GoogleLogin
                    
                    onSuccess={responseGoogle}
                    onError={responseError}
                    
                    /> */}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login
