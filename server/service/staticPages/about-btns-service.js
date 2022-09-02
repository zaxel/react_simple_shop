

class AboutBtnsService {
    getAboutButtons = (data) => {
        const allButtons = [];
        const addButton = (buttons) => {
            buttons.filter(btn => !allButtons.includes(btn)).forEach(el=>allButtons.push(el));
        }
        if(data.button_id && data.button_id.length){
            addButton(data.button_id);
        }
        if(data.info_about_cards && data.info_about_cards.length){
            data.info_about_cards.filter(el=>el.button_id && el.button_id.length)
                                .map(btn=>btn.button_id)
                                .forEach(b=>addButton(b));
            
            data.info_about_cards.filter(el=>el.info_about_blocks  && el.info_about_blocks.length)
                                .forEach(card=>card.info_about_blocks
                                            .filter(block=>block.button_id && block.button_id.length)
                                            .map(btn=>btn.button_id)
                                            .forEach(b=>addButton(b)))
        }
        return allButtons;
    }
}

module.exports = new AboutBtnsService();