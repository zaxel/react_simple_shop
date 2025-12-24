import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../shadcn/button";
import { cn } from "../../../utils/cn"
import RateItem from "../../device/RateItem";

const statusColors = {
    PENDING: "bg-yellow-400",
    PAID: "bg-green-400",
    CANCELED: "bg-red-400",
    PAYMENT_FAILED: "bg-red-500",
};

export const columnsOrders = [
    {
        accessorKey: "id",
        header: () => {
            return (
                <div className="text-left">
                    Order Id
                </div>
            )
        },
        meta: { className: "hidden xl:table-cell" },
        cell: ({ row }) => {
            return <div className="font-medium ml-4">{parseInt(row.getValue("id"))}</div>
        },
    },
    {
        accessorKey: "createdAt",
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
        accessorKey: "amount",
        meta: { className: "hidden lg:table-cell" },
        header: () => {
            return (
                <div className="text-center">
                    Amount
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = row.getValue("total");
            return <div className="text-center">{amount}</div>
        },
    },
    {
        accessorKey: "status",
        meta: { className: "hidden md:table-cell" },
        header: () => {
            return (
                <div className="text-center">
                    Status
                </div>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("status");
            return <span className={cn(
                `p-1 rounded-md text-xs text-foreground`,
                statusColors[status]
            )}>{status}</span>
        },
    },
    {
        id: "details",
        header: () => {
            return (
                <div className="text-center">
                    Order Details
                </div>
            )
        },
        cell: ({ table, row }) => {
            const { setOrderDetailsId } = table.options?.meta;
            const orderId = row.original.id;
            return <div className="text-center">
                <Button onClick={() => setOrderDetailsId(orderId)} variant="link">details</Button>
            </div>
        },
    },
    {
        accessorKey: "total",
        header: () => {
            return (
                <div className="text-center">
                    Paid
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium mr-4">{formatted}</div>
        },
    },
]
export const columnsDetails = [
    {
        accessorKey: "deviceId",
        header: "Item Id",
        meta: { className: "hidden xl:table-cell" },
        cell: ({ row }) => {
            return <div className="font-medium ml-4">{parseInt(row.getValue("deviceId"))}</div>
        },
    },
    {
        accessorKey: "name",
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
            const item = row.getValue("name");
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
        accessorKey: "device_amount",
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
            const amount = row.getValue("device_amount");
            return <div className="text-center">{amount}</div>
        },
    },
    {
        accessorKey: "rate",
        meta: { className: "hidden md:table-cell" },
        header: () => {
            return (
                <div className="text-center">
                    Rate
                </div>
            )
        },
        cell: ({ row }) => {
            const rate = parseFloat(row.getValue("rate"));
            return <div className="scale-75" >
                <RateItem rate={rate} />

            </div>
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
            const date = dateObj.toLocaleDateString("en-US");
            const time = dateObj.toLocaleTimeString("en-US");

            return <div className="text-center">{date} {time}</div>
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    className="w-full justify-center"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="h-2 w-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium mr-4">{formatted}</div>
        },
    },
]