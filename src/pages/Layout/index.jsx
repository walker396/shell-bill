import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import { useDispatch } from "react-redux";
import { getBillList } from "../../store/modules/billStore";
import { Badge, TabBar } from "antd-mobile";
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from "antd-mobile-icons";
export default function Layout() {
  const tabs = [
    {
      key: "/",
      title: "Month bills",
      icon: <BillOutline />,
      badge: Badge.dot,
    },
    {
      key: "new",
      title: "New bill",
      icon: <AddCircleOutline />,
      badge: "5",
    },
    {
      key: "year",
      title: "Year",
      icon: <CalculatorOutline />,
      badge: "99+",
    },
  ];

  const [activeKey, setActiveKey] = useState("/");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  const navi = useNavigate();
  const switchTab = (path) => {
    navi(path);
  };
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={switchTab}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}
