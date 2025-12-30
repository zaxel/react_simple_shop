import React, { useContext } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../shadcn/select";
import { Context } from '../..';

const TypeBarSm = () => {
    const { device } = useContext(Context);

    const setType = (typeId) => {
        device.setTypeActive(typeId === "all" ? null : Number(typeId));
        device.setActivePage(1);
    }

    return (
        <Select
            value={device.typeActive === null ? "all" : String(device.typeActive)}
            onValueChange={setType}
        >
            <SelectTrigger className="min-w-[150px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup >
                    <SelectItem value="all" >All types</SelectItem>
                    {(device?.types || []).map(type => {
                        return <SelectItem value={String(type.id)} key={type.id}>{type.name}</SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default TypeBarSm;