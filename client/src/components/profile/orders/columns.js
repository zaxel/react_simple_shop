import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../shadcn/button";
import { cn } from "../../../utils/cn"

const statusColors = {
    "in progress": "bg-yellow-400",
    completed: "bg-green-400",
    failed: "bg-red-400",
};

export const columns = [
    {
        accessorKey: "id",
        header: "Order Id",
        meta: { className: "hidden xl:table-cell" },
        cell: ({ row }) => {
            return <div className="font-medium ml-4">{parseInt(row.getValue("id"))}</div>
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    className="w-full justify-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Item
                    <ArrowUpDown className="h-2 w-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const item = row.getValue("title");
            const img = row.original.img;  
            const brand = row.original.brand;  

            return (
                <div className="flex items-center gap-3">
                    <img
                        className="h-14 w-14 rounded object-cover"
                        src={img}
                        alt={item}
                    />
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs text-gray-500">{brand}</span>
                        <span className="text-sm font-medium truncate max-w-[200px]">{item}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "amountOrdered",
         meta: { className: "hidden xl:table-cell" },
        header: ({ column }) => {
            return (
                <Button
                    className="w-full justify-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="h-2 w-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = row.getValue("amountOrdered");
            return <div className="text-center">{amount}</div>
        },
    },
    {
        accessorKey: "status",
         meta: { className: "hidden md:table-cell" },
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return <span className={cn(
                `p-1 rounded-md text-xs text-foreground`,
                statusColors[status]
            )}>{status}</span>
        },
    },
    {
        accessorKey: "createdAt",
         meta: { className: "hidden lg:table-cell" },
        header: ({ column }) => {
            return (
                <Button
                    className="w-full justify-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order Date
                    <ArrowUpDown className="h-2 w-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const dateObj = new Date(row.getValue("createdAt"));
            const date = dateObj.toLocaleDateString("en-GB");
            const time = dateObj.toLocaleTimeString("en-GB");

            return <div className="text-center">{date} {time}</div>
        },
    },
    {
        accessorKey: "total",
        header: ({ column }) => {
            return (
                <Button
                    className="w-full justify-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Paid
                    <ArrowUpDown className="h-2 w-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total"))
            const formatted = new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
            }).format(amount)

            return <div className="text-right font-medium mr-4">{formatted}</div>
        },
    },
]