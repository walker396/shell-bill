import classNames from "classnames";
import "./index.scss";
import React, { useMemo, useState } from "react";
import _ from "lodash";
import Icon from "../../../components/Icon";
export default function DailyBill({ date, billList }) {
  const [visible, setVisible] = useState(false);
  const dayResult = useMemo(() => {
    // const dayGroupList = _.groupBy(monthBillList, (item) =>
    //   dayjs(item.date).fromat("YYYY-MM-DD")
    // );
    const pay = billList
      .filter((item) => item.type === "pay")
      .reduce((pre, cur) => pre + cur.money, 0);
    const income = billList
      .filter((item) => item.type === "income")
      .reduce((pre, cur) => pre + cur.money, 0);
    return { pay, income, total: pay + income };
  });
  return (
    <div
      className={classNames("dailyBill")}
      onClick={() => setVisible(!visible)}
    >
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span className={classNames("arrow", visible && "expand")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">Expenses</span>
            <span className="money">{dayResult.pay?.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">Income</span>
            <span className="money">{dayResult.income?.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total?.toFixed(2)}</span>
            <span className="type">Balance</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? "block" : "none" }}>
        {billList.map((item) => {
          return (
            <div className="bill" key={item.id}>
              {/* 图标 */}
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{item.useFor}</div>
              </div>
              <div className={classNames("money", item.type)}>
                {item.money?.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
