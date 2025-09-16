import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { FaPlusCircle } from "react-icons/fa";
import DataTable from "@/components/DataTable";
import EditButton from "@/Components/EditButton";
import DeleteButton from "@/Components/DeleteButton";
import { Button } from "@/Components/ui/button";

export default function Index({ brands }) {
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
            accessorKey: "name",
            header: "Car Brand Name",
            cell: (info) => info.getValue(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-start">
                    <EditButton url={`/brands/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/brands/${row.original.id}`}
                        confirmMessage="Are you sure to delete this question?"
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
                    data={brands}
                    createButton={
                        <Button
                            variant="outline"
                            onClick={() => router.get("/brands/create")}
                        >
                            <FaPlusCircle className="" /> Create New Car Brand
                        </Button>
                    }
                />
            </div>
        </AdminLayout>
    );
}
