import React from "react";
import { Switch, Route } from "react-router";
import { Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

const WalletSetup = (_props: any) => {
  return (
    <div>
      Create Wallet Setup
      <Button
        onClick={() => toast.error("Success Notification !", {})}
      ></Button>
    </div>
  );
};

export default WalletSetup;
