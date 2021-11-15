import useUser from "@/hooks/useUser";
import router from "next/router";
import React, { useEffect, useState } from "react";
const Admin = () => {
  const { user } = useUser();
  useEffect(() => {
    if (!user.isAdmin) {
      router.push("/");
    }else{
        
    }
  });
  return <div></div>;
};

export default Admin;
