import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
export default function index() {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <Button color="primary">Primary</Button>
      <div>Layout</div>
    </>
  );
}
