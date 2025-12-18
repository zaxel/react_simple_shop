import z from "zod";


export const formShippingSchema = z.object({
    name: z
        .string({ message: "Must be a string." })
        .min(2, { message: "Name must be at least two characters." })
        .max(50, { message: "Name must be less than fifty characters." }),

    email: z
        .string({ message: "Must be a string." })
        .email({ message: "Invalid email address." }),

    phone: z
        .string({ message: "Must be a string." })
        .regex(/^\+?[0-9\s\-()]+$/, { message: "Invalid phone number format." })
        .min(4, { message: "Phone number must be at least 4 characters." })
        .max(25, { message: "Phone number must be less than 25 characters." }),

    address: z
        .string({ message: "Must be a string." })
        .min(4, { message: "Address must be at least 4 characters." })
        .max(250, { message: "Address must be less than 250 characters." }),

    city: z
        .string({ message: "Must be a string." })
        .min(4, { message: "City must be at least 4 characters." })
        .max(250, { message: "City must be less than 250 characters." }),
});

export const formPaymentSchema = z.object({
    cardHolder: z
        .string()
        .min(2, { message: "Card holder must be at least 2 characters." })
        .max(150, { message: "Card holder must be less than 150 characters." }),

    cardNumber: z
        .string()
        .min(16, { message: "Card number is required." })
        .max(16, { message: "Card number is required." }),

    expirationDate: z
        .string()
        .trim()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format")
        .refine((value) => {
            const [mm, yy] = value.split("/").map(Number);
            const now = new Date();
            const currentYear = now.getFullYear() % 100;
            const currentMonth = now.getMonth() + 1;

            return yy > currentYear || (yy === currentYear && mm >= currentMonth);
        }, {
            message: "Card has expired",
        }),

    cvv: z
        .string({ message: "Must be a string." })
        .min(3, { message: "CVV is required." })
        .max(3, { message: "CVV is required." })
});

