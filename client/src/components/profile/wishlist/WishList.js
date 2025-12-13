import { ClipboardPaste } from "lucide-react";
import { Button } from "../../../shadcn/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../shadcn/select";
import { useState } from "react";
import RateItem from "../../device/RateItem";

const WishList = () => {
    const [sortBy, setSortBy] = useState("date");

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
                                <SelectItem value={"price_low_hight"}>
                                    Price (low → high)
                                </SelectItem>
                                <SelectItem value={"price_hight_low"}>
                                    Price (high → low)
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            </div>
            <div className='flex flex-wrap items-center justify-evenly bg-primary-foreground p-2 rounded-lg gap-1'>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Samsung</p>
                            <p className='font-medium text-sm line-clamp-3 mb-2'>Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£279.95</div>
                                <p className='text-sm text-muted-foreground'>Added 12.12.2012</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Beco</p>
                            <p className='font-medium text-sm line-clamp-3 mb-3'>Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£3790.00</div>
                                <p className='text-sm text-muted-foreground'>Added 18.10.2022</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Samsung</p>
                            <p className='font-medium text-sm line-clamp-3 mb-2'>Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£279.95</div>
                                <p className='text-sm text-muted-foreground'>Added 12.12.2012</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Beco</p>
                            <p className='font-medium text-sm line-clamp-3 mb-3'>Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£3790.00</div>
                                <p className='text-sm text-muted-foreground'>Added 18.10.2022</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Samsung</p>
                            <p className='font-medium text-sm line-clamp-3 mb-2'>Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£279.95</div>
                                <p className='text-sm text-muted-foreground'>Added 12.12.2012</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Beco</p>
                            <p className='font-medium text-sm line-clamp-3 mb-3'>Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£3790.00</div>
                                <p className='text-sm text-muted-foreground'>Added 18.10.2022</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Samsung</p>
                            <p className='font-medium text-sm line-clamp-3 mb-2'>Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£279.95</div>
                                <p className='text-sm text-muted-foreground'>Added 12.12.2012</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Beco</p>
                            <p className='font-medium text-sm line-clamp-3 mb-3'>Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£3790.00</div>
                                <p className='text-sm text-muted-foreground'>Added 18.10.2022</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Samsung</p>
                            <p className='font-medium text-sm line-clamp-3 mb-2'>Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£279.95</div>
                                <p className='text-sm text-muted-foreground'>Added 12.12.2012</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Beco</p>
                            <p className='font-medium text-sm line-clamp-3 mb-3'>Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£3790.00</div>
                                <p className='text-sm text-muted-foreground'>Added 18.10.2022</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Samsung</p>
                            <p className='font-medium text-sm line-clamp-3 mb-2'>Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£279.95</div>
                                <p className='text-sm text-muted-foreground'>Added 12.12.2012</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Beco</p>
                            <p className='font-medium text-sm line-clamp-3 mb-3'>Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£3790.00</div>
                                <p className='text-sm text-muted-foreground'>Added 18.10.2022</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArjig5RaSN94i9mKCI4ay63ea4X1ZJsQEyQ&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Samsung</p>
                            <p className='font-medium text-sm line-clamp-3 mb-2'>Beko Robot Cleaner VRR60314VW | White/Chrome Design | 150 Minute Run Time | 2000</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£279.95</div>
                                <p className='text-sm text-muted-foreground'>Added 12.12.2012</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>
                <div key={"id"} className='bg-card sm:w-60 w-full p-2 rounded-lg'>
                    <img className="h-auto max-w-full aspect-video mb-3 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcHnc94LVn1b8JGkgEIykqVd485j1JFvr30w&s" alt="glasses" />
                    <div>
                        <div>
                            <p className='font-bold text-md line-clamp-1'>Beco</p>
                            <p className='font-medium text-sm line-clamp-3 mb-3'>Adjustable Air Conditioner Deflector Telescopic Windshield Baffle Cover</p>
                        </div>
                        <div className='deviceItem__rating-cont scale-75 origin-left'>
                            <RateItem rate={"4"} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div>£3790.00</div>
                                <p className='text-sm text-muted-foreground'>Added 18.10.2022</p>
                            </div>
                            <Button onClick={() => console.log("id")} className='!rounded-full !w-10 !h-10' variant="destructive"><ClipboardPaste /> </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );


};

export default WishList;