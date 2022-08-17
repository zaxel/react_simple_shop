﻿import UserStore from "./UserStore";
import DeviceStore from "./DeviceStore";
import HistoryStore from "./HistoryStore";
import CartStore from "./CartStore";
import ToolTipStore from "./ToolTipStore";

import UsersStore from "./adminPage/UsersStore";
import OrdersStore from "./adminPage/OrdersStore";
import DevicesStore from "./adminPage/DevicesStore";
import DevicesInfoStore from "./adminPage/DevicesInfoStore";
import TypesStore from "./adminPage/TypesStore";
import BrandsStore from "./adminPage/BrandsStore";
import OrderDetailsStore from "./adminPage/OrderDetailsStore";
import UserOrdersStore from "./adminPage/UserOrdersStore";

export default class RootStore {
    constructor() {
      this.user = new UserStore(this);
      this.device = new DeviceStore(this);
      this.history = new HistoryStore(this);
      this.cart = new CartStore(this);
      this.toolTip = new ToolTipStore(this);
      this.users = new UsersStore(this);
      this.orders = new OrdersStore(this);
      this.adminDevices = new DevicesStore(this);
      this.adminDevicesInfo = new DevicesInfoStore(this);
      this.types = new TypesStore(this);
      this.brands = new BrandsStore(this);
      this.orderDetails = new OrderDetailsStore(this);
      this.userOrders = new UserOrdersStore(this);
    }
} 