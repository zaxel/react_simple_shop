import { addWishItem, getWishItems } from "../http/userAPI";

const setWishList = async (user, history) => {
    if (!user?.user?.id) return;
    const wishList = await getWishItems(user.user.id);
    if (!wishList || !wishList.count)
        return;
    await user.setWishList(wishList.rows.map(el => el.deviceId));
    if (history.pendingWish) {
        const deviceId = history.pendingWish;
        if (!user.wishlist.has(deviceId)) {
            const res = await addWishItem(user.user.id, deviceId);
            if(res){
                user.addWishlistItem(deviceId);
            }
        }
        history.clearPendingWish(); 
    }
}
export default setWishList;