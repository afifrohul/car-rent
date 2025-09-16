import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/Layouts/AdminLayout";
import { SiteHeader } from "@/Components/site-header";
import { Label } from "@/Components/ui/label";

export default function Create() {
    const { errors } = usePage().props;

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("user.store"), form);
    };

    return (
        <AdminLayout siteHeader={<SiteHeader name="Create User" />}>
            <Head title="Create User" />
            <div className="container max-w-xl">
                <div className="border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    handleChange("password", e.target.value)
                                }
                                placeholder="Enter password"
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
                                onClick={() => router.get(route("dashboard"))}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
