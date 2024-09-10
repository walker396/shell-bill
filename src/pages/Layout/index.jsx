import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useDispatch } from "react-redux";
import { getBillList } from "../../store/modules/billStore";
export default function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, []);
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
