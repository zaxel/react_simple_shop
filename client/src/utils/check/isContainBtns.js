export const isContainBtns = (store, buttons) => {
    const keys = Object.keys(store.buttons);
    if (!buttons)
        return false;
    for (let i = 0; i < buttons.length; i++) {
        if (!keys.includes(buttons[i].toString())) {
            return false;
        }
    }
    return true;
}