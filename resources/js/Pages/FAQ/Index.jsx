import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { FaPlusCircle } from "react-icons/fa";
import DataTable from "@/components/DataTable";
import EditButton from "@/Components/EditButton";
import DeleteButton from "@/Components/DeleteButton";
import { Button } from "@/Components/ui/button";

export default function Index({ faqs }) {
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
            accessorKey: "question",
            header: "Question",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "answer",
            header: "Answer",
            cell: (info) => info.getValue(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-start">
                    <EditButton url={`/faqs/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/faqs/${row.original.id}`}
                        confirmMessage="Are you sure to delete this FAQ?"
                    />
                </div>
            ),
        },
    ];
    return (
        <AdminLayout siteHeader={<SiteHeader name="FAQ" />}>
            <Head title="FAQ" />
            <div className="w-full mx-auto flex flex-col gap-4">
                <DataTable
                    columns={columns}
                    data={faqs}
                    createButton={
                        <Button
                            variant="outline"
                            onClick={() => router.get("/faqs/create")}
                        >
                            <FaPlusCircle className="" /> Create New FAQ
                        </Button>
                    }
                />
            </div>
        </AdminLayout>
    );
}
