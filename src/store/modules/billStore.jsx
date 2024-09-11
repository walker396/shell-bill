import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList: (state, action) => {
      state.billList = action.payload;
    },
  },
});
const { setBillList } = billStore.actions;
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(res.data));
  };
};
const addBill = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8888/ka", data);
    console.log(res.data);
    dispatch(setBillList(res.data));
  };
};

const billReducer = billStore.reducer;

export { getBillList, addBill };
export default billReducer;
