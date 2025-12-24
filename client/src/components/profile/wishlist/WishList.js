import { ClipboardPaste } from "lucide-react";
import { Button } from "../../../shadcn/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../shadcn/select";
import { useMemo, useState } from "react";
import RateItem from "../../device/RateItem";
import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../..";
import { deleteWishItem } from "../../../http/userAPI";
import useFetch from "../../../utils/http/useFetch";
import { Spinner } from "../../../shadcn/spinner";
import ErrorBox from "../../ErrorBox";

const WishList = () => {
    const [sortBy, setSortBy] = useState("date");
    const [wishItems, setWishItems] = useState([]);
    const { user } = useContext(Context);
    const userId = user.user?.id;
    const url = userId ? `api/user/${userId}/wishitems` : null;

    const { data, error, isLoading } = useFetch(url, null, true);

    const sortedWishItems = useMemo(() => {
        const items = [...wishItems];
        switch (sortBy) {
            case "date":
                return items.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            case "price_low_high":
                return items.sort((a, b) => a.price - b.price);
            case "price_high_low":
                return items.sort((a, b) => b.price - a.price);
            default:
                return items;
        }
    }, [wishItems, sortBy]);


    const handleDelete = async itemId => {
        if (!itemId || !userId) return;
        const res = await deleteWishItem(userId, itemId);
        if (!res) return;

        setWishItems(prev => prev.filter(wish => wish.deviceId !== itemId));
        user.deleteWishlistItem(itemId);
    }
    const getDate = timestamp => {
        if (!timestamp) return;
        const dateObj = new Date(timestamp);
        const date = dateObj.toLocaleDateString("en-GB");
        const time = dateObj.toLocaleTimeString("en-GB", {
            hour: '2-digit',
            minute: '2-digit'
        });
        return <span className="text-center">{date} {time}</span>
    }

    useEffect(() => {
        if (!data || !data.count)
            return;
        setWishItems(data.rows)
    }, [data]);

    if (error)
        return <ErrorBox error={error} />

    if (isLoading)
        return <div className="flex justify-center items-center h-[75vh]"> <Spinner /></div>

    return (
        <div className='sm:min-w-[30rem] w-full p-4 flex flex-col gap-4'>
            <div className='flex flex-wrap items-center justify-between  bg-primary-foreground p-6 rounded-lg gap-4'>
                <h2 className='font-medium'>Wish List</h2>

                <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value)}
                >
                    <SelectTrigger className="!w-[220px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectItem value={"date"}>
                                Date
                            </SelectItem>
                            <SelectItem value={"price_low_high"}>
                                Price (low → high)
                            </SelectItem>
                            <SelectItem value={"price_high_low"}>
                                Price (high → low)
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-wrap items-center justify-evenly bg-primary-foreground p-2 rounded-lg gap-1'>
                {!wishItems.length && !isLoading && (
                    <p className="text-muted-foreground text-center py-12">
                        Your wishlist is empty
                    </p>
                )}
                {sortedWishItems.map(({ id, img, name, price, rate, brand, createdAt, deviceId }) => {
                    return <div key={id} className='bg-card sm:w-60 w-full h-[340px] p-2 rounded-lg'>
                        <img className="h-auto max-w-full w-full aspect-video mb-3 object-cover" src={img} alt={`${brand} ${name}`} />
                        <div className="flex flex-col h-44">
                            <div>
                                <p className='font-bold text-md line-clamp-1'>{brand}</p>
                                <p className='font-medium text-sm line-clamp-3 mb-3'>{name}</p>
                            </div>
                            <div className='deviceItem__rating-cont scale-75 origin-left'>
                                <RateItem rate={rate} />
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <p>${price.toFixed(2)}</p>
                                    <p className='text-sm text-muted-foreground'>Added {getDate(createdAt)}</p>
                                </div>
                                <Button onClick={() => handleDelete(deviceId)} className='!rounded-full !w-10 !h-10 p-0' variant="destructive"><ClipboardPaste /> </Button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );


};

export default WishList;