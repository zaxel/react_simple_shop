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


const InfoPages = sequelize.define('info_pages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    title: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    img: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
    text: {type: DataTypes.ARRAY(DataTypes.STRING(1024)), allowNull: true},
    link: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
    button_id: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true},
})
const InfoHelpPopular = sequelize.define('info_help_popular', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    category: {type: DataTypes.STRING, allowNull: false},
    faq_id: {type: DataTypes.INTEGER, allowNull: false},
})
const InfoHelpCategories = sequelize.define('info_help_categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    banner: {type: DataTypes.STRING, allowNull: false},
    icon: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false},
    faqs: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false},
})
const InfoHelpQuestions = sequelize.define('info_help_questions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    question: {type: DataTypes.STRING, allowNull: false},
    answer_id: {type: DataTypes.INTEGER, allowNull: false},
})
const InfoHelpAnswers = sequelize.define('info_help_answers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    related_questions: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false},
})
const InfoHelpRelatedQuestions = sequelize.define('info_help_related_questions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    answer_id: {type: DataTypes.INTEGER, allowNull: false},
})


const InfoAboutCards = sequelize.define('info_about_cards', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: true},
  card_text: {type: DataTypes.STRING(1024), allowNull: true},
  card_prev_text: {type: DataTypes.STRING(1024), allowNull: true},
  hero: {type: DataTypes.STRING, allowNull: true},
  button_id: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true},
})
const InfoAboutBlocks = sequelize.define('info_about_blocks', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: true},
  text: {type: DataTypes.STRING, allowNull: true},
  hero: {type: DataTypes.STRING, allowNull: true},
  button_id: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true},
})
const ButtonLink = sequelize.define('button_link', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.STRING, allowNull: false},
  link: {type: DataTypes.STRING, allowNull: false},
})
const ButtonMediator = sequelize.define('button_mediator', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


const InfoAppCards = sequelize.define('info_app_cards', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  hero: {type: DataTypes.STRING, allowNull: false},
  link: {type: DataTypes.STRING, allowNull: false},
  app_button_img: {type: DataTypes.STRING, allowNull: false},
  app_button_dark_img: {type: DataTypes.STRING, allowNull: false},
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


  InfoPages.hasMany(InfoHelpPopular)
  InfoHelpPopular.belongsTo(InfoPages)

  InfoPages.hasMany(InfoHelpCategories)
  InfoHelpCategories.belongsTo(InfoPages)
  
  InfoHelpCategories.hasMany(InfoHelpQuestions)
  InfoHelpQuestions.belongsTo(InfoHelpCategories)
  
  InfoHelpPopular.hasOne(InfoHelpQuestions)
  InfoHelpQuestions.belongsTo(InfoHelpPopular)
  
  InfoHelpAnswers.hasOne(InfoHelpQuestions)
  InfoHelpQuestions.belongsTo(InfoHelpAnswers)
  
  InfoHelpAnswers.hasMany(InfoHelpRelatedQuestions)
  InfoHelpRelatedQuestions.belongsTo(InfoHelpAnswers)
  
  InfoHelpRelatedQuestions.hasMany(InfoHelpCategories)
  InfoHelpCategories.belongsTo(InfoHelpRelatedQuestions)

  InfoPages.hasMany(InfoAboutCards)
  InfoAboutCards.belongsTo(InfoPages)

  InfoAboutCards.hasMany(InfoAboutBlocks)
  InfoAboutBlocks.belongsTo(InfoAboutCards)
  
  InfoAboutBlocks.belongsToMany(ButtonLink, {through: ButtonMediator})
  ButtonLink.belongsToMany(InfoAboutBlocks, {through: ButtonMediator})
  
  InfoAboutCards.belongsToMany(ButtonLink, {through: ButtonMediator})
  ButtonLink.belongsToMany(InfoAboutCards, {through: ButtonMediator})
  
  
  InfoPages.belongsToMany(ButtonLink, {through: ButtonMediator})
  ButtonLink.belongsToMany(InfoPages, {through: ButtonMediator})


  InfoPages.hasMany(InfoAppCards)
  InfoAppCards.belongsTo(InfoPages)

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
      DeviceInfo,

      InfoPages,
      InfoHelpPopular,
      InfoHelpCategories,
      InfoHelpQuestions,
      InfoHelpAnswers,
      InfoHelpRelatedQuestions,
      
      InfoAboutCards,
      InfoAboutBlocks,
      ButtonLink,

      InfoAppCards,
  }
