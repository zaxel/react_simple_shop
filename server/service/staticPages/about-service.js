const { InfoAboutCards, InfoAboutBlocks, InfoPages, ButtonLink } = require('../../models/models');
const AboutDto = require('../../dtos/static-page-about-dto.js');
const AboutBlockDto = require('../../dtos/static-page-about-block-dto.js');
const AboutCardDto = require('../../dtos/static-page-about-card-dto.js');
const AboutBtnDto = require('../../dtos/static-page-about-btn-dto.js');
const PageDto = require('../../dtos/static-page-dto.js');
const fileService = require("../file/file-service");
const {PageBtnsService, CardBtnService, BlockBtnService} = require("../staticPages/about-btns-service");

class AboutService {
    getChoosedBtns = async ({id}) => {
        let btns = await ButtonLink.findAll({
            where:  {id}
        });
        let buttons = btns.reduce((obj, btn)=>{
            return {...obj, [btn.id]: new AboutBtnDto(btn)}
        }, {});
        return buttons;
    }
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
        const btnsNumbers = new PageBtnsService().getPageButtons(page);
        const buttons = await this.getChoosedBtns({id:btnsNumbers});
        page = new AboutDto(page);
        
        return {page, buttons};

        
    }
    updateCard = async ({id, title, card_text, hero, card_prev_text, button_id, infoPageId }) => {
        let fileName = null;
        if (hero) {
            fileName = await fileService.imageResolve(hero);
        }
        let updatedData = await InfoAboutCards.update({title, card_text, hero: fileName, card_prev_text, button_id, infoPageId }, {
            where: { id }
          });
        return updatedData;
    }
    getSingleCard = async ({ id }) => {
        let card = await InfoAboutCards.findOne({
            where:  {id},
            include: [{ 
                model: InfoAboutBlocks, as: 'info_about_blocks' 
            }] 
        });
        card = new AboutCardDto(card);
        const btnsNumbers = new CardBtnService().getCardButtons(card);
        const buttons = await this.getChoosedBtns({id:btnsNumbers});
        return {card, buttons};
    }
    getAllCards = async () => {
        let cardsArr = await InfoAboutCards.findAll({
            include: [{ 
                model: InfoAboutBlocks, as: 'info_about_blocks' 
            }] 
        });
        const cards = await Promise.all(
            cardsArr.map(async (el)=> {
                const card = new AboutCardDto(el);
                const btnsNumbers = new CardBtnService().getCardButtons(card);
                const buttons = await this.getChoosedBtns({id:btnsNumbers});
                return {card, buttons};
            })
        ) 
        return {cards};
    }
    updateCardImg = async ({id, hero}) => {
        if (!hero) {
            throw new Error('No image received!')
        }
        let fileName = await fileService.imageResolve(hero);
        const updatedData = await InfoAboutCards.update({ hero: fileName }, {
            where: { id }
        });
        return { updatedData };
    }
    deleteCard = async (id) => {
        const updatedData = await InfoAboutCards.destroy({
            where: { id }
        });
        return { updatedData };
    }


    createBlock = async ({ title, text, hero, button_id, infoAboutCardId }) => {
        let fileName = null;
        if (hero && hero.length) {
            fileName = hero.map(img=>fileService.imageResolve(img));
        }
        
        let block = await InfoAboutBlocks.create({ title, text, button_id, infoAboutCardId, hero: fileName });
        block = new AboutBlockDto(block);
        return block;
    }
    updateBlock = async ({id, title, text, hero, button_id, infoAboutCardId }) => {
        let fileName = null;
        if (hero && hero.length) {
            fileName = hero.map(img=>fileService.imageResolve(img));
        }
        let updatedData = await InfoAboutBlocks.update({title, text, hero: fileName, button_id, infoAboutCardId }, {
            where: { id }
          });
        return updatedData;
    }
    getSingleBlock = async ({id}) => {
        let block = await InfoAboutBlocks.findOne({
            where:  {id}
        });
        block = new AboutBlockDto(block);
        const btnsNumbers = new BlockBtnService().getBlockButtons(block);
        const buttons = await this.getChoosedBtns({id:btnsNumbers});
        return {block, buttons};
    }
    getAllBlocks = async () => {
        let blocks = await InfoAboutBlocks.findAll();
        blocks = Promise.all(blocks.map(async el=> {
            const block = new AboutBlockDto(el);
            const btnsNumbers = new BlockBtnService().getBlockButtons(block);
            const buttons = await this.getChoosedBtns({id:btnsNumbers});
            return {block, buttons}
        }));
        return blocks;
    }
    updateBlockImg = async ({id, hero}) => {
        if (!hero) {
            throw new Error('No image received!')
        }
        let fileName = await fileService.imageResolve(hero);
        const updatedData = await InfoAboutBlocks.update({ hero: fileName }, {
            where: { id }
        });
        return { updatedData };
    }
    deleteBlock = async (id) => {
        const updatedData = await InfoAboutBlocks.destroy({
            where: { id }
        });
        return { updatedData };
    }
    
    
    createBtn = async ({ text, link }) => {
        let btn = await ButtonLink.create({ text, link });
        btn = new AboutBtnDto(btn);
        return btn;
    }
    updateBtn = async ({id, text, link }) => {
        let updatedData = await ButtonLink.update({text, link }, {
            where: { id }
          });
        return updatedData;
    }
    getAllBtns = async () => {
        let btns = await ButtonLink.findAll();

        let buttons = btns.reduce((obj, btn)=>{
            return {...obj, [btn.id]: new AboutBtnDto(btn)}
        }, {});
        return buttons;

    }
    deleteBtn = async (id) => {
        const updatedData = await ButtonLink.destroy({
            where: { id }
        });
        return { updatedData };
    }
}

module.exports = new AboutService();