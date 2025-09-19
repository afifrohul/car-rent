import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { FaPlusCircle } from "react-icons/fa";
import DataTable from "@/components/DataTable";
import EditButton from "@/Components/EditButton";
import DeleteButton from "@/Components/DeleteButton";
import { Button } from "@/Components/ui/button";

export default function Index({ types }) {
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
            header: "City Name",
            cell: (info) => info.getValue(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-start">
                    <EditButton url={`/types/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/types/${row.original.id}`}
                        confirmMessage="Are you sure to delete this car type?"
                    />
                </div>
            ),
        },
    ];
    return (
        <AdminLayout siteHeader={<SiteHeader name="Car Type" />}>
            <Head title="Car Type" />
            <div className="w-full mx-auto flex flex-col gap-4">
                <DataTable
                    columns={columns}
                    data={types}
                    createButton={
                        <Button
                            variant="outline"
                            onClick={() => router.get("/types/create")}
                        >
                            <FaPlusCircle className="" /> Create New Car Type
                        </Button>
                    }
                />
            </div>
        </AdminLayout>
    );
}
