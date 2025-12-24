import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../../shadcn/sheet';

import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/form';
import { Input } from '../../../shadcn/input';
import { Button } from '../../../shadcn/button';

const formFieldNames = [
    "country",
    "postal_code",
    "city",
    "county",
    "street",
    "house",
];

const getFormSchemaFields = z => {
    const formSchemaFields = {};
    formFieldNames.forEach(field =>
        formSchemaFields[field] = z
            .string({ message: "Must be a string." })
            .min(1, { message: "Must be at least 1 characters." })
            .max(40, { message: "Must be less than 40 characters." }),
    )
    return formSchemaFields;
}

const formSchema = z.object(getFormSchemaFields(z));

const AddressSheetContent = ({addNewAddress, onClose}) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: Object.fromEntries(
            formFieldNames.map(name => [name, ""])
        )
    })

    const onSubmitHandler = async data => {
        await addNewAddress(data);
        form.reset();
        onClose();
    }
    return (
        <SheetContent className="!gap-0 overflow-y-auto">
            <SheetHeader>
                <SheetTitle className='mb-6'>Add Address</SheetTitle>
                <SheetDescription>
                    Please enter your new address below.
                </SheetDescription>
            </SheetHeader>
            <Form {...form} asChild>
                <form onSubmit={form.handleSubmit(onSubmitHandler)} className='p-6'>
                    {formFieldNames.map(fieldName => {

                        return <FormField
                            key={fieldName}
                            control={form.control}
                            name={fieldName}
                            render={({ field }) => (
                                <FormItem className='mb-2'>
                                    <FormLabel>{fieldName}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={fieldName} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {`Add your ${fieldName}.`}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    })}
                    <Button className='mt-5' type='submit'>Submit</Button>
                </form>
            </Form>
        </SheetContent>

    );
};

export default AddressSheetContent;