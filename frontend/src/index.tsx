import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import BasicLayout from "./layouts/BasicLayout";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store";

//import reportWebVitals from "./reportWebVitals";


function Get_content (){
    return (
    <Provider store={store}>
        <SnackbarProvider>
            <BasicLayout />
        </SnackbarProvider>
    </Provider>)
}


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    Get_content()
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
