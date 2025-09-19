import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { FaPlusCircle } from "react-icons/fa";
import DataTable from "@/components/DataTable";
import EditButton from "@/Components/EditButton";
import DeleteButton from "@/Components/DeleteButton";
import { Button } from "@/Components/ui/button";

export default function Index({ cars }) {
    console.log(cars);
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
            header: "Car Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "user.name",
            header: "Car Owner",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "city.name",
            header: "City",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "brand.name",
            header: "Brand",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "type.name",
            header: "Type",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "fuel_type",
            header: "Fuel Type",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "rental_price",
            header: "Rental Price",
            cell: (info) => `Rp${info.getValue()}`,
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2 justify-start">
                    <EditButton url={`/cars/${row.original.id}/edit`} />
                    <DeleteButton
                        url={`/cars/${row.original.id}`}
                        confirmMessage="Are you sure to delete this car?"
                    />
                </div>
            ),
        },
    ];
    return (
        <AdminLayout siteHeader={<SiteHeader name="Car" />}>
            <Head title="Car" />
            <div className="w-full mx-auto flex flex-col gap-4">
                <DataTable
                    columns={columns}
                    data={cars}
                    createButton={
                        <Button
                            variant="outline"
                            onClick={() => router.get("/cars/create")}
                        >
                            <FaPlusCircle className="" /> Create New Car
                        </Button>
                    }
                />
            </div>
        </AdminLayout>
    );
}
