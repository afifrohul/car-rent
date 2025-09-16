import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/Layouts/AdminLayout";
import { SiteHeader } from "@/Components/site-header";
import { Label } from "@/Components/ui/label";

export default function Edit({ user }) {
    const { errors } = usePage().props;
    const [form, setForm] = useState({
        name: user.name || "",
        email: user.email || "",
        password: "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(route("user.update", user.id), form);
    };
    return (
        <AdminLayout siteHeader={<SiteHeader name="Edit Project" />}>
            <Head title="Edit Project" />
            <div className="container max-w-xl flex flex-col gap-4 ">
                <div className="border p-6 rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-4 ">
                        <div>
                            <Label className="block mb-1 text-sm font-medium">
                                Name
                            </Label>
                            <Input
                                value={form.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                placeholder="Enter name"
                            />
                            {errors.name && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="block mb-1 text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
                                }
                                placeholder="Enter email"
                            />
                            {errors.email && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="block mb-1 text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                value={form.password}
                                onChange={(e) =>
                                    handleChange("password", e.target.value)
                                }
                                placeholder="Enter password"
                                type="password"
                            />
                            {errors.password && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    router.get(route("dashboard", user.id))
                                }
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
