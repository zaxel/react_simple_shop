import UserStore from "./UserStore";
import DeviceStore from "./DeviceStore";
import HistoryStore from "./HistoryStore";
import CartStore from "./CartStore";
import ToolTipStore from "./ToolTipStore";
import AdminUsersStore from "./AdminUsersStore";
import AdminOrdersStore from "./AdminOrdersStore";
import AdminDevicesStore from "./AdminDevicesStore";
import AdminDevicesInfoStore from "./AdminDevicesInfoStore";
import AdminTypesStore from "./AdminTypesStore";

export default class RootStore {
    constructor() {
      this.user = new UserStore(this);
      this.device = new DeviceStore(this);
      this.history = new HistoryStore(this);
      this.cart = new CartStore(this);
      this.toolTip = new ToolTipStore(this);
      this.users = new AdminUsersStore(this);
      this.orders = new AdminOrdersStore(this);
      this.adminDevices = new AdminDevicesStore(this);
      this.adminDevicesInfo = new AdminDevicesInfoStore(this);
      this.types = new AdminTypesStore(this);
    }
} 