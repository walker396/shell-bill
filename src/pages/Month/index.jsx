import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import classNames from "classnames";
import { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import DailyBill from "./Day";
import _ from "lodash";
const Month = () => {
  const billList = useSelector((state) => state.bill.billList);
  const monthGroupList = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState(dayjs().format("YYYY-MM"));
  const [currentMonthList, setCurrentMonthList] = useState([]);
  const [dayGroupList, setDayGroupList] = useState([]);
  const monthResult = useMemo(() => {
    // console.log(dayGroupList);
    const pay = currentMonthList
      ?.filter((item) => item.type === "pay")
      .reduce((pre, cur) => {
        return pre + cur.money;
      }, 0);
    const income = currentMonthList
      ?.filter((item) => item.type === "income")
      .reduce((pre, cur) => {
        return pre + cur.money;
      }, 0);
    return { pay, income, total: pay + income };
  }, [currentMonthList]);

  useEffect(() => {
    const currentDate = dayjs().format("YYYY-MM");

    if (monthGroupList[currentDate]) {
      setCurrentMonthList(monthGroupList[currentDate]);
      //   setDayGroupList(
      //     _.groupBy(currentMonthList, (item) =>
      //       dayjs(item.date).format("YYYY-MM-DD")
      //     )
      //   );
      //   monthList.filter((item) => {
      //     item;
      //   });
    }
  }, [monthGroupList]);

  const onConfirm = (value) => {
    const currentDate = dayjs(value).format("YYYY-MM");
    setDate(currentDate);
    setCurrentMonthList(monthGroupList[currentDate]);
    setDateVisible(false);
  };

  // 当前月按照日来做分组
  const dayGroup = useMemo(() => {
    // return出去计算之后的值
    const groupData = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const keys = Object.keys(groupData);
    return {
      groupData,
      keys,
    };
  }, [currentMonthList]);
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        Monthly Bill
      </NavBar>
      <div className="content">
        <div className="header">
          {/* Time Switch Area*/}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{date} Bill</span>
            {/* Idea: Control the presence of the 'expand' class based on the current modal open state */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* statictist area */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">Expenses</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">Balance</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="Bill date"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
        {dayGroup.keys.map((key) => {
          return (
            <DailyBill
              key={key}
              date={key}
              billList={dayGroup.groupData[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
