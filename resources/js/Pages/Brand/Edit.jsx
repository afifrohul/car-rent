import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Edit({ brand }) {
    const { errors } = usePage().props;
    const [form, setForm] = useState({
        name: brand.name || "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/brands/${brand.id}`, {
            ...form,
        });
    };

    return (
        <AdminLayout siteHeader={<SiteHeader name="Edit Car Brand" />}>
            <Head title="Edit Car Brand" />
            <div className="container w-full">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 border p-6 rounded-lg"
                >
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Name
                        </label>
                        <Input
                            value={form.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            placeholder="Enter car brand name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get("/brands")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Update Car Brand</Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
