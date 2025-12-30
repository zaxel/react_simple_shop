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
import { observer } from 'mobx-react-lite';

const BrandBarSm = () => {
    const {device} = useContext(Context);

    const setBrand = (brand) => {
        device.setBrandActive(brand==="all" ? null : Number(brand));
        device.setActivePage(1);
    }
  return (

    <Select 
        value={device.brandActive === null ? "all" : String(device.brandActive)}
        onValueChange={setBrand}
    >
      <SelectTrigger className="min-w-[150px]">
        <SelectValue /> 
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectItem value="all" >All brands</SelectItem>
        {(device?.brands || []).map(brand => {
               return <SelectItem value={String(brand.id)} key={brand.id}>{brand.name}</SelectItem>
            })}
        </SelectGroup>
      </SelectContent>
    </Select>

  )
}

export default observer(BrandBarSm);