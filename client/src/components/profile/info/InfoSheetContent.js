import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../../shadcn/sheet';

import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/form';
import { Input } from '../../../shadcn/input';
import { Button } from '../../../shadcn/button';
import { useEffect } from 'react';

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
        .min(4, { message: "Phone number must be at least 4 characters." })
        .max(25, { message: "Phone number must be less than 25 characters." }),
});


const InfoSheetContent = ({user, editUser, onClose}) => {


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone
        },
         mode: 'onChange'
    })


    useEffect(() => {
  if (user) {
    form.reset({
      name: user.name ?? "",
      surname: user.surname ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    });
  }
}, [user, form]);


    const onSubmitHandler = async(data) => {
        await editUser(data);
        form.reset(data);
        onClose();
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
                <form onSubmit={form.handleSubmit(onSubmitHandler)} className='p-6'>
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