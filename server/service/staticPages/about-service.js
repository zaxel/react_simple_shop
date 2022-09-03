﻿const { InfoAboutCards, InfoAboutBlocks, InfoPages } = require('../../models/models');
const AboutDto = require('../../dtos/static-page-about-dto.js');
const AboutBlockDto = require('../../dtos/static-page-about-block-dto.js');
const PageDto = require('../../dtos/static-page-dto.js');
const fileService = require("../file/file-service");
const aboutBtnsService = require("../staticPages/about-btns-service");

class AboutService {
    createCard = async ({ title, card_text, card_prev_text, hero, button_id, infoPageId }) => {
        let fileName = null;
        if (hero) {
            fileName = await fileService.imageResolve(hero);
        }
        
        let card = await InfoAboutCards.create({ title, card_text, card_prev_text, hero: fileName, button_id, infoPageId });
        card = new AboutDto(card);
        return card;
    }
   

    getPage = async ({name}) => {
        let page = await InfoPages.findOne({
            where: { name },
            include: [{ 
                model: InfoAboutCards, as: 'info_about_cards',
                include: [{ 
                    model: InfoAboutBlocks, as: 'info_about_blocks' 
                }] 
            }]
        });
        const buttons = aboutBtnsService.getAboutButtons(page);
        page = new AboutDto(page);
        return {page, buttons};

        
    }
    update = async ({id, title, card_text, hero, card_prev_text, button_id, infoPageId }) => {
        let updatedData = await InfoAboutCards.update({title, card_text, hero, card_prev_text, button_id, infoPageId }, {
            where: { id }
          });
        return updatedData;
    }
    
    // getSingleCard = async ({ id }) => {
    //     let card = await InfoAppCards.findOne({
    //         where:  {id}
    //     });
    //     card = new AppDto(card);
    //     return card;
    // }
    // getAllCards = async () => {
    //     let cards = await InfoAppCards.findAll();
    //     cards = cards.map(el=> new AppDto(el));
    //     return cards;
    // }
    // updateCardImg = async (id, img, imgDbCollName) => {
    //     if (!img) {
    //         throw new Error('No image received!')
    //     }
    //     let fileName = await fileService.imageResolve(img);
    //     const updatedData = await InfoAppCards.update({ [imgDbCollName]: fileName }, {
    //         where: { id }
    //     });
    //     return { updatedData };
    // }
    createBlock = async ({ title, text, hero, button_id, infoAboutCardId }) => {
        let fileName = null;
        if (hero) {
            fileName = await fileService.imageResolve(hero);
        }
        
        let block = await InfoAboutBlocks.create({ title, text, button_id, infoAboutCardId, hero: fileName });
        block = new AboutBlockDto(block);
        return block;
    }

}

module.exports = new AboutService();