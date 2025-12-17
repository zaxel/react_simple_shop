const sequelize = require("../../db");
const { Address } = require("../../models/models");

class AddressService {
    get = async ({ userId }) => {
        const addresses = await Address.findAndCountAll({ where: { user_id: userId } });
        return addresses;
    }

    add = async ({ id, user_id, street, house, apartment, city, postal_code, country, county, is_default }) => {
        const result = await Address.create({ id, user_id, street, house, apartment, city, postal_code, country, county, is_default });
        return result;
    }

    update = async ({ id, newData }) => {
        const updatedData = await Address.update(newData, {
            where: { id }
        });
        return updatedData;
    }

    delete = async ({ id }) => {
        const updatedData = await Address.destroy({
            where: { id }
        });
        return updatedData;
    }

    setDefault = async ({ id, user_id }) => {
        return await sequelize.transaction(async (t) => {
            await Address.update(
                { is_default: false },
                { where: { user_id }, transaction: t }
            );

            const [affected] = await Address.update(
                { is_default: true },
                { where: { id, user_id }, transaction: t }
            );

            if (affected === 0) 
                throw new Error('Address not found or not owned by user');

            return true;
        });
    }
}

module.exports = new AddressService();