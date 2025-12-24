import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shadcn/table";
import Pagination from "./Pagination";
import { cn } from "../../../utils/cn";

export function DataTable({ 
    columns, 
    data, 
    orderDetailsId, 
    setOrderDetailsId, 
    totalCount, 
    limit,
    pagination, 
    setPagination, 
    sorting, 
    setSorting,
    isLoading
}) {
    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(totalCount / limit) || 0, // ✅ Handle division by zero
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        state: {
            pagination,
            sorting,
        },
        meta: {
            setOrderDetailsId, 
        },
    });
    
    return (
        <div className="overflow-hidden rounded-md border">
            <div className={cn(isLoading && "opacity-50 pointer-events-none")}>
                <Table>
                    <TableHeader className="bg-gray-100 border-b">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={cn(
                                            "text-left px-2 py-2 font-semibold text-gray-700 sticky top-0 bg-gray-100 z-10",
                                            header.column.columnDef.meta?.className
                                        )}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-200">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                "py-1",
                                                cell.column.columnDef.meta?.className
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-gray-500"
                                >
                                    {isLoading ? "Loading..." : "No results."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination table={table} />
        </div>
    );
}