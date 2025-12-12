import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../../shadcn/sheet';

import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/form';
import { Input } from '../../../shadcn/input';
import { Button } from '../../../shadcn/button';

const formFieldNames = ['name', 'surname', 'email', 'phone'];

const formSchema = z.object({
    name: z
        .string({ message: "Must be a string." })
        .min(2, { message: "User name must be at least two characters." })
        .max(50, { message: "User name must be less than fifty characters." }),

    surname: z
        .string({ message: "Must be a string." })
        .min(2, { message: "User surname must be at least two characters." })
        .max(50, { message: "User surname must be less than fifty characters." }),

    email: z
        .string({ message: "Must be a string." })
        .email({ message: "Invalid email address." }),

    phone: z
        .string({ message: "Must be a string." })
        .regex(/^\+?[0-9\s\-()]+$/, { message: "Invalid phone number format." })
        .min(8, { message: "Phone number must be at least 8 characters." })
        .max(15, { message: "Phone number must be less than 15 characters." }),
});


const InfoSheetContent = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "Michael",
            surname: "Brown",
            email: "brown@gmail.com",
            phone: "+1 234 56789"
        },
         mode: 'onChange'
    })

    const onSubmitHandler = e => {
        e.preventDefault();
    }
    return (
        <SheetContent className="!gap-0 overflow-y-auto">
            <SheetHeader>
                <SheetTitle className='mb-6'>Edit User</SheetTitle>
                <SheetDescription>
                    Please enter your information below.
                </SheetDescription>
            </SheetHeader>
            <Form {...form} asChild>
                <form onSubmit={onSubmitHandler} className='p-6'>
                    {formFieldNames.map(fieldName => {

                        return <FormField                            
                            key={fieldName}
                            control={form.control}
                            name={fieldName}
                            render={({ field }) => (
                                <FormItem className='mb-4'>
                                    <FormLabel>{fieldName}</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {`This is your ${fieldName}.`}
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

export default InfoSheetContent;