import { Vendor } from '@/types.ts';
import { GridList, GridListItem } from 'react-aria-components';

type VendorProps = {
  vendors: Array<Vendor>;
};

export const VendorList = ({ vendors }: VendorProps) => {
  return (
    <GridList aria-label="Vendor List" selectionMode="single">
      {vendors.map((vendor) => (
        <GridListItem key={vendor.id} textValue={vendor.name}>
          {vendor.name}
        </GridListItem>
      ))}
    </GridList>
  );
};
