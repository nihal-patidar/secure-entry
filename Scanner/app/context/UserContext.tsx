'use client';

import { createContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

// Define the shape of the context value
interface UserContextType {
  userData: any;
  setUserData: (data: any) => void;
  showLoading: boolean;
  setShowLoading: (loading: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  sendEmailForVerification: () => void;
  sendEmailForForgetPassword: () => void;
  image: File | null;
  setImage: (image: File | null) => void;
  sendImage: File | null;
  setSendImage: (image: File | null) => void;
  openTab: boolean;
  setOpenTab: (open: boolean) => void;
  visitors: any[];
  setVisitors: (visitors: any[]) => void;
  serviceId : String | null ;
  setServiceId : (data : String | null) => void ;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the props for the provider
interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [sendImage, setSendImage] = useState<File | null>(null);
  const [openTab, setOpenTab] = useState<boolean>(false);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [serviceId , setServiceId] = useState<String | null >(null);
  
  // Example functions
  const sendEmailForVerification = () => {
    toast.success("Email for verification sent!");
  };

  const sendEmailForForgetPassword = () => {
    toast.info("Email for password reset sent!");
  };

  const contextValue: UserContextType = {
    userData,
    setUserData,
    showLoading,
    setShowLoading,
    token,
    setToken,
    sendEmailForVerification,
    sendEmailForForgetPassword,
    image,
    setImage,
    sendImage,
    setSendImage,
    openTab,
    setOpenTab,
    visitors,
    setVisitors,
    serviceId,
    setServiceId
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
