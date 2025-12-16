module.exports = class UserDto {
    email;
    id;
    role;
    is_activated;
    createdAt;
    name;
    surname;
    phone;

    constructor(model){
        this.email = model.email;
        this.id = model.id;
        this.role = model.role;
        this.is_activated = model.is_activated;
        this.createdAt = Date.parse(model.createdAt);
        this.name = model.name;
        this.surname = model.surname;
        this.phone = model.phone;
    }
}