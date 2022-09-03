
class AboutBtnService{
    allButtons = [];
    addButton(buttons){
        buttons.filter(btn => !this.allButtons.includes(btn)).forEach(el=>this.allButtons.push(el));
    }
    getButtons(data){
        if(data.button_id && data.button_id.length){
            this.addButton(data.button_id);
        }
    }
}
class BlockBtnService extends AboutBtnService{
    getBlockButtons(data){
        this.getButtons(data);
        return this.allButtons;
    }
}
class CardBtnService extends AboutBtnService{
    getCardButtons(data){
        this.getButtons(data);

        if(data.button_id && data.button_id.length){
            this.addButton(data.button_id);
        }
        if(data.info_about_blocks && data.info_about_blocks.length){
            data.info_about_blocks.filter(el=>el.button_id && el.button_id.length)
                                .map(btn=>btn.button_id)
                                .forEach(b=>this.addButton(b));
        }
        return this.allButtons;
    }
}
class PageBtnsService extends AboutBtnService{
    getPageButtons(data){
        this.getButtons(data);

        if(data.button_id && data.button_id.length){
            this.addButton(data.button_id);
        }
        if(data.info_about_cards && data.info_about_cards.length){
            data.info_about_cards.filter(el=>el.button_id && el.button_id.length)
                                .map(btn=>btn.button_id)
                                .forEach(b=>this.addButton(b));
            
            data.info_about_cards.filter(el=>el.info_about_blocks  && el.info_about_blocks.length)
                                .forEach(card=>card.info_about_blocks
                                            .filter(block=>block.button_id && block.button_id.length)
                                            .map(btn=>btn.button_id)
                                            .forEach(b=>this.addButton(b)))
        }
        return this.allButtons;
    }
}

module.exports = { PageBtnsService, CardBtnService, BlockBtnService};