import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { usePage } from "@inertiajs/react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function Edit({ discount }) {
    const { errors } = usePage().props;
    const formatDateTime = (dateTime) => {
        if (!dateTime) return "";
        return dateTime.replace(" ", "T");
    };

    const [form, setForm] = useState({
        code: discount.code || "",
        desc: discount.desc || "",
        discount_type: discount.discount_type || "percentage",
        discount_value: discount.discount_value || "",
        min_transaction: discount.min_transaction || "",
        start_date: formatDateTime(discount.start_date),
        end_date: formatDateTime(discount.end_date),
        is_active: discount.is_active ? "1" : "0",
    });

    console.log(discount);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/discounts/${discount.id}`, {
            ...form,
        });
    };

    return (
        <AdminLayout siteHeader={<SiteHeader name="Edit Discount" />}>
            <Head title="Edit Discount" />
            <div className="container w-full">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 border p-6 rounded-lg"
                >
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Discount Code
                            </label>
                            <Input
                                value={form.code}
                                onChange={(e) =>
                                    handleChange("code", e.target.value)
                                }
                                placeholder="Enter discount code"
                            />
                            {errors.code && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.code}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Discount Type
                            </label>
                            <Select
                                value={form.discount_type}
                                onValueChange={(value) =>
                                    handleChange("discount_type", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Discount Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">
                                        Percentage
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.discount_type && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.discount_type}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Discount Value
                            </label>
                            <Input
                                value={form.discount_value}
                                onChange={(e) =>
                                    handleChange(
                                        "discount_value",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter discount value"
                                type="number"
                            />
                            {errors.discount_value && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.discount_value}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            value={form.desc}
                            onChange={(e) =>
                                handleChange("desc", e.target.value)
                            }
                            placeholder="Enter Discount Description"
                            rows={4}
                        />
                        {errors.desc && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.desc}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Start Date & Time
                            </label>
                            <div className="flex gap-4">
                                {/* Date Picker */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="flex-1 justify-start"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {form.start_date
                                                ? format(
                                                      new Date(form.start_date),
                                                      "PPP"
                                                  )
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={
                                                form.start_date
                                                    ? new Date(form.start_date)
                                                    : undefined
                                            }
                                            onSelect={(date) => {
                                                if (date) {
                                                    const prevTime =
                                                        form.start_date?.split(
                                                            "T"
                                                        )[1] || "00:00:00";
                                                    handleChange(
                                                        "start_date",
                                                        `${
                                                            date
                                                                .toISOString()
                                                                .split("T")[0]
                                                        }T${prevTime}`
                                                    );
                                                }
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>

                                {/* Time Input */}
                                <Input
                                    className="w-fit "
                                    type="time"
                                    value={
                                        form.start_date
                                            ? form.start_date
                                                  .split("T")[1]
                                                  ?.slice(0, 5)
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const datePart =
                                            form.start_date?.split("T")[0] ||
                                            new Date()
                                                .toISOString()
                                                .split("T")[0];
                                        handleChange(
                                            "start_date",
                                            `${datePart}T${e.target.value}:00`
                                        );
                                    }}
                                />
                            </div>
                            {errors.start_date && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.start_date}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                End Date & Time
                            </label>
                            <div className="flex gap-4">
                                {/* Date Picker */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="flex-1 justify-start"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {form.end_date
                                                ? format(
                                                      new Date(form.end_date),
                                                      "PPP"
                                                  )
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={
                                                form.end_date
                                                    ? new Date(form.end_date)
                                                    : undefined
                                            }
                                            onSelect={(date) => {
                                                if (date) {
                                                    const prevTime =
                                                        form.end_date?.split(
                                                            "T"
                                                        )[1] || "00:00:00";
                                                    handleChange(
                                                        "end_date",
                                                        `${
                                                            date
                                                                .toISOString()
                                                                .split("T")[0]
                                                        }T${prevTime}`
                                                    );
                                                }
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>

                                {/* Time Input */}
                                <Input
                                    className="w-fit "
                                    type="time"
                                    value={
                                        form.end_date
                                            ? form.end_date
                                                  .split("T")[1]
                                                  ?.slice(0, 5)
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const datePart =
                                            form.end_date?.split("T")[0] ||
                                            new Date()
                                                .toISOString()
                                                .split("T")[0];
                                        handleChange(
                                            "end_date",
                                            `${datePart}T${e.target.value}:00`
                                        );
                                    }}
                                />
                            </div>
                            {errors.end_date && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Min Transaction
                            </label>
                            <Input
                                value={form.min_transaction}
                                onChange={(e) =>
                                    handleChange(
                                        "min_transaction",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter min transaction"
                                type="number"
                            />
                            {errors.min_transaction && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.min_transaction}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Status
                            </label>
                            <Select
                                value={form.is_active}
                                onValueChange={(value) =>
                                    handleChange("is_active", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status Discount" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Active</SelectItem>
                                    <SelectItem value="0">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.is_active && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.is_active}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get("/discounts")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save Discount</Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
