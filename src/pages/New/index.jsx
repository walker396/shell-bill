import { useState } from "react";
import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "../../components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "../../contants";
import { useNavigate } from "react-router-dom";
import { addBill } from "../../store/modules/billStore";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
const New = () => {
  const navigate = useNavigate();
  const [payOrIncome, setPayOrIncome] = useState("pay");
  const [money, setMoney] = useState(0);
  const [useFor, setUseFor] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const saveBill = () => {
    const formData = {
      id: new Date().getTime(),
      type: payOrIncome,
      money: payOrIncome === "pay" ? -money : +money,
      date: date,
      useFor: useFor,
    };
    dispatch(addBill(formData));
    navigate(-1);
  };
  const cofirmDate = (date) => {
    console.log(date);
    setDate(date);
    setShowDate(false);
  };
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(payOrIncome === "pay" ? "selected" : "")}
            onClick={() => setPayOrIncome("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames(payOrIncome === "income" ? "selected" : "")}
            shape="rounded"
            onClick={() => setPayOrIncome("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={() => setShowDate(true)}>
              <Icon type="calendar" className="icon" />
              <span className="text">{dayjs(date).format("YYYY-MM-DD")}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={showDate}
                onConfirm={cofirmDate}
                onCancel={() => setShowDate(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(value) => setMoney(value)}
              />
              <span className="iconYuan">$</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[payOrIncome].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        "item",
                        useFor === item.type ? "selected" : ""
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
