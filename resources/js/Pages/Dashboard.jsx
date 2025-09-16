import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { SiteHeader } from "@/components/site-header";
import DataTable from "@/components/DataTable";
import ConfirmButton from "@/Components/confirm-button";
import { Button } from "@/Components/ui/button";
import { FaPlusCircle } from "react-icons/fa";

export default function Dashboard(users) {
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
            header: "Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => info.getValue(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-start">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                            router.get(route("user.edit", row.original.id))
                        }
                    >
                        Edit
                    </Button>
                    <ConfirmButton
                        title="Delete this user?"
                        description="This action cannot be undone. Are you sure you want to delete this?"
                        onConfirm={() => handleDelete(row.original.id)}
                    >
                        Delete
                    </ConfirmButton>
                </div>
            ),
        },
    ];

    const handleDelete = (id) => {
        router.delete(route("user.destroy", id), { preserveScroll: true });
    };

    return (
        <AdminLayout siteHeader={<SiteHeader name="Dashboard" />}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4">
                <div className="border rounded-lg p-4 text-gray-900 dark:text-gray-100">
                    You're logged in!
                </div>
                <div className="w-full mx-auto flex flex-col gap-4 borderp border rounded-lg p-4">
                    <DataTable
                        columns={columns}
                        data={users.users}
                        createButton={
                            <Button
                                variant="outline"
                                onClick={() => router.get(route("user.create"))}
                            >
                                <FaPlusCircle className="mr-2" /> Create New
                                User
                            </Button>
                        }
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
