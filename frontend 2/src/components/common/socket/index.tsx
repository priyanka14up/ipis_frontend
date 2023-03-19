import React, { useState, useEffect } from "react";
import NotificationsIcon from '@material-ui/icons/Notifications';
import openSocket from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@material-ui/core";
import SockJS from 'sockjs-client';
const {over} = require('stompjs');
var stompClient: any =null;
export const Socket = () => {

    const [state, setState] = useState("");
    const [notificationArr, setArr] = useState<any>([]);
    const [notificationLength, setNotificationLength] = useState();
    const connect = () =>{
        let Sock = new SockJS('http://localhost:8054/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected);
    }

    const onConnected = () =>{
        stompClient.subscribe("/user",(notification: any)=>{
            setState(notification?.body);
            notifications(notification?.body);
        })
    }    
    

    const handleNotification = () => {
        notificationArr.map((data: any) => {
            toast.info(data, { autoClose: false });
        })
        setArr([]);
    }
    useEffect(()=>{
        connect();
    },[])

    const notifications = (data: any) => {
        notificationArr.push(data);
        setNotificationLength(notificationArr.length);
        console.log(notificationArr);
    }

    return (
        <>
            <Button onClick={handleNotification} style={{ textAlign: "center", fontSize: "325%", backgroundColor: " white", color: "#009688" }}><NotificationsIcon />
                <ToastContainer style={{ width: "25%", fontSize: "medium" }}>
                </ToastContainer>
            </Button>
            <span style={{ color: "red", paddingBottom: "500%" }}>{notificationArr.length == 0 ? null : notificationLength}</span>
        </>
    );
};