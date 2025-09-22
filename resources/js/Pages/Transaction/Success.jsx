import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import DataTable from "@/components/DataTable";
import { Button } from "@/Components/ui/button";

export default function Success({ transactions }) {
    const columns = [
        {
            id: "index",
            header: "#",
            cell: ({ row, table }) =>
                row.index +
                1 +
                table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize,
        },
        {
            accessorKey: "user.name",
            header: "Customer Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "car_name",
            header: "Car Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "car_brand",
            header: "Car Brand",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "car_type",
            header: "Car Type",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "price_per_hour",
            header: "Price Per Hour",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "start_time",
            header: "Start Time",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "end_time",
            header: "End Time",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "subtotal",
            header: "Subtotal (Rp)",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "discount_code",
            header: "Discount Code",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "discount_value",
            header: "Discount Value",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "total_price",
            header: "Total Price (Rp)",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "payment_status",
            header: "Payment Status",
            cell: ({ row }) => (
                <span className={`px-2 py-1 rounded text-white bg-green-500`}>
                    {row.original.payment_status}
                </span>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-start">
                    <Button
                        onClick={() =>
                            router.visit(
                                `/transaction/${row.original.id}/show`
                            )
                        }
                        className="text-xs px-2"
                        size="sm"
                    >
                        Detail
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <AdminLayout siteHeader={<SiteHeader name="Succes Transactions" />}>
            <Head title="Succes Transactions" />
            <div className="w-full mx-auto flex flex-col gap-4">
                <DataTable columns={columns} data={transactions} />
            </div>
        </AdminLayout>
    );
}
