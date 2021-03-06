const sequelize = require('../db');
const DataTypes = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  is_activated: {type: DataTypes.BOOLEAN, defaultValue: false},
  activation_link: {type: DataTypes.STRING},
})

const Token = sequelize.define('token', {
  
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  refresh_token: {type: DataTypes.STRING(1024), allowNull: true},
})
const Basket = sequelize.define('basket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  device_amount: {type: DataTypes.INTEGER, allowNull: false},
})


const Order = sequelize.define('order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const OrderDevice = sequelize.define('order_device', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  device_amount: {type: DataTypes.INTEGER, allowNull: false},
})

const Device = sequelize.define('device', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  rate: {type: DataTypes.FLOAT, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
})

const Rate = sequelize.define('rate', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

  User.hasOne(Token)
  Token.belongsTo(User)
  
  User.hasOne(Basket)
  Basket.belongsTo(User)
  
  User.hasMany(Order)
  Order.belongsTo(User)

  User.hasMany(Rate)
  Rate.belongsTo(User)

  Basket.hasMany(BasketDevice)
  BasketDevice.belongsTo(Basket)

  Order.hasMany(OrderDevice)
  OrderDevice.belongsTo(Order)

  Device.hasMany(DeviceInfo, {as: 'info'})
  DeviceInfo.belongsTo(Device)

  Type.hasMany(Device)
  Device.belongsTo(Type)
  
  Brand.hasMany(Device)
  Device.belongsTo(Brand)

  Device.hasMany(Rate)
  Rate.belongsTo(Device)

  Device.hasOne(BasketDevice)
  BasketDevice.belongsTo(Device)
  
  Device.hasOne(OrderDevice)
  OrderDevice.belongsTo(Device)

  Type.belongsToMany(Brand, {through: TypeBrand})
  Brand.belongsToMany(Type, {through: TypeBrand})

  module.exports = {
      Token,
      User,
      Basket,
      BasketDevice,
      Order,
      OrderDevice,
      Device,
      Type,
      Brand,
      Rate,
      TypeBrand,
      DeviceInfo
  }
