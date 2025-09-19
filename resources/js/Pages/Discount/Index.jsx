import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { FaPlusCircle } from "react-icons/fa";
import DataTable from "@/components/DataTable";
import EditButton from "@/Components/EditButton";
import DeleteButton from "@/Components/DeleteButton";
import { Button } from "@/Components/ui/button";

export default function Index({ discounts }) {
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
            accessorKey: "code",
            header: "Discount Code",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "desc",
            header: "Description",
            cell: (info) =>
                info.getValue().length > 20
                    ? info.getValue().substring(0, 20) + "..."
                    : info.getValue(),
        },
        {
            accessorKey: "discount_value",
            header: "Discount Value",
            cell: (info) => info.getValue() + "%",
        },
        {
            accessorKey: "min_transaction",
            header: "Min Transaction",
            cell: (info) => "$" + info.getValue(),
        },
        {
            accessorKey: "start_date",
            header: "Start Date",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "end_date",
            header: "End Date",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "is_active",
            header: "Status",
            cell: (info) => (info.getValue() ? "Active" : "Inactive"),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-start">
                    <EditButton url={`/discounts/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/discounts/${row.original.id}`}
                        confirmMessage="Are you sure to delete this discount?"
                    />
                </div>
            ),
        },
    ];
    return (
        <AdminLayout siteHeader={<SiteHeader name="Car Brand" />}>
            <Head title="Car Brand" />
            <div className="w-full mx-auto flex flex-col gap-4">
                <DataTable
                    columns={columns}
                    data={discounts}
                    createButton={
                        <Button
                            variant="outline"
                            onClick={() => router.get("/discounts/create")}
                        >
                            <FaPlusCircle className="" /> Create New Discount
                        </Button>
                    }
                />
            </div>
        </AdminLayout>
    );
}
