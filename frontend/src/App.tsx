import * as React from "react";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import { CreateProfile } from "./pages/CreateProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Search } from "./pages/Search";
import { useAppDispatch } from "./hooks/store";
import { authActions } from "./store/slices/authSlice";
import { useState } from "react";

type Props = {
    changeMode: () => void,
    darkMode: boolean
} 

export const App = ({changeMode, darkMode}: Props) => {
    const dispatch = useAppDispatch();
    const logIn = localStorage.getItem("logedIn");

    if(!darkMode){
        if(localStorage.getItem('darkMode')){
            changeMode()
        }
    }

    if (logIn) {
        let text = localStorage.getItem("user");
        if (text) {
            let res = JSON.parse(text);
            dispatch(
                authActions.login({
                    id: res["id"],
                    first_name: res["first_name"],
                    last_name: res["last_name"],
                    username: res["username"],
                    password: res["password"],
                })
            );
        }
    }

    const handleChangeMode = () => {
        changeMode()
        if(darkMode){
            changeMode()
            localStorage.removeItem('darkMode');
        }else{
            changeMode()
            localStorage.setItem('darkMode', "dark mode on");
        }
    }



    return (
        <div>
            <Router>
                <NavBar darkMode = {darkMode} 
                        handleChangeDarkMode = {() => {handleChangeMode()}}/>
                <Routes>
                    <Route path="/" element={<Home darkMode = {darkMode}/>} />
                    <Route path="/createprofile" element={<CreateProfile darkMode = {darkMode}/>} />
                    <Route path="/profile" element={<Profile darkMode = {darkMode}/>} />
                    <Route path="/search" element={<Search darkMode = {darkMode}/>} />
                </Routes>
            </Router>
        </div>
    );
};
export default App;
