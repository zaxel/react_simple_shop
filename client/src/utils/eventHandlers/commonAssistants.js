export const offEditOnTooltip = (setEdit, toolTip) => {
    setEdit(false);
    toolTip.setIsAvailable(true);
} 

export const loadingAndFetch = async(setLoading, cb) => {
    setLoading(true);
    const data = await cb();
    if (data.loggedOut) return;
    setLoading(false);
    return data;
}

