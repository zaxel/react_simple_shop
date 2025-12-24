import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../..';
import { useNavigate, useParams } from 'react-router-dom';
import { addWishItem, deleteWishItem } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Spinner } from '../../shadcn/spinner';
import { LOGIN_ROUTE } from '../../utils/consts/routes';

const DeviceBuyAddToList = () => {
    const { user, history } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    
    const deviceId = Number(id);
    const userId = user.user?.id;
    const [loading, setLoading] = useState(false);
    
    const inList = user.wishlist.has(deviceId);

    const handleToggleWish = async () => {
        if (!deviceId || loading) return;
        if (!user.isAuth) {
            history.setPendingWish(deviceId); 
            navigate(LOGIN_ROUTE);
            return;
        }

        if (!userId) return;

        const wasInList = user.wishlist.has(deviceId);
        setLoading(true);

        try {
            if (wasInList) {
                user.deleteWishlistItem(deviceId);
                await deleteWishItem(userId, deviceId);
            } else {
                user.addWishlistItem(deviceId);
                await addWishItem(userId, deviceId);
            }
        } catch (error) {
            if (wasInList) {
                user.addWishlistItem(deviceId);
            } else {
                user.deleteWishlistItem(deviceId);
            }
            console.error('Failed to update wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='dev-buy__add-list'>
            {loading ? (
                <Spinner className="m-auto" />
            ) : (
                <Button 
                    onClick={handleToggleWish} 
                    className='btn btn-outline-light auth__button device__button'
                >
                    {inList ? "saved" : "add to list"}
                </Button>
            )}
        </div>
    );
};

export default observer(DeviceBuyAddToList);