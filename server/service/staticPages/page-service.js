const { InfoAppCards, InfoPages } = require('../../models/models');
const PageDto = require('../../dtos/static-page-dto.js');
const fileService = require("../file/file-service");
const { Op } = require("sequelize");

class PageService {
    create = async ({ name, title, img, text, link, button_id }) => {
        let page = await InfoPages.create({ name, title, img, text, link, button_id });
        page = new PageDto(page);
        return page;
    }
    
    update = async (id, field, newData) => {
        const updatedData = await InfoPages.update({ [field]: newData }, {
            where: { id }
        });
        return { updatedData };
    }

    updateImg = async (id, type, img) => {
        if (!img) {
            throw new Error('No image received!')
        }
        let fileName = await fileService.imageResolve(img);

        let index = null;
        switch (type){
            case 'mainHero':
                index = 0;
                break;
            case 'contactLargeBg':
                index = 1;
                break;
            case 'contactSmallBg':
                index = 2;
                break;
            default:
                return;
        }
        const dbImgs = await InfoPages.findOne({
            where: { id },
            attributes: ['img']
        })
        const imgArr = dbImgs.img;
        imgArr[index] = fileName;

        const updatedData = await InfoPages.update({ img: imgArr }, {
            where: { id }
        })
        return updatedData;
    }

    getPage = async ({ id, name }) => {
        const searchParams = (id && {id}) ?? (name && {name});
        let page = await InfoPages.findOne({
            where:  {...searchParams}
        });
        page = new PageDto(page);
        return page;
    }
    
}

module.exports = new PageService();