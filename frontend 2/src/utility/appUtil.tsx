import React from "react";
export const getAccessToken = (): string | null => {
  const bearerToken = localStorage.getItem("authToken");
  return bearerToken;
};

export const setAccessToken = (data: string): void => {
  localStorage.setItem("authToken", data);
};

export const setVerified = (data: string): void => {
  localStorage.setItem("verified", data);
};

export const getVerified = (): string | null => {
  const bearerToken = localStorage.getItem("verified");
  console.log(bearerToken);
  return bearerToken;
};

export const getUserPermission = (user: any) =>{
  if(user.userRole == "ROLE_STATION MASTER" || user.userRole == "ROLE_OPERATOR")
  {
    return false;
  }
  else{
    return true;
  }
};