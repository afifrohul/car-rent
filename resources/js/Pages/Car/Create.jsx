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
import { Textarea } from "@/components/ui/textarea";

export default function Create({ brands, types, cities }) {
    const { errors } = usePage().props;
    const [form, setForm] = useState({
        name: "",
        brand_id: "",
        type_id: "",
        city_id: "",
        desc: "",
        total_seat: "",
        gear_system: "",
        fuel_type: "",
        engine_hp: "",
        color: "",
        car_number: "",
        rental_price: "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/cars", {
            ...form,
            brand_id: Number(form.brand_id),
            city_id: Number(form.city_id),
            type_id: Number(form.type_id),
        });
    };

    return (
        <AdminLayout siteHeader={<SiteHeader name="Create Car" />}>
            <Head title="Create Car" />
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
                            placeholder="Enter Car name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                City
                            </label>
                            <Select
                                value={form.city_id}
                                onValueChange={(value) =>
                                    handleChange("city_id", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select City Available" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem
                                            key={city.id}
                                            value={String(city.id)}
                                        >
                                            {city.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.city_id && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.city_id}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Car Brand
                            </label>
                            <Select
                                value={form.brand_id}
                                onValueChange={(value) =>
                                    handleChange("brand_id", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Car Brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((brand) => (
                                        <SelectItem
                                            key={brand.id}
                                            value={String(brand.id)}
                                        >
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.brand_id && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.brand_id}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Car Type
                            </label>
                            <Select
                                value={form.type_id}
                                onValueChange={(value) =>
                                    handleChange("type_id", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Car Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {types.map((type) => (
                                        <SelectItem
                                            key={type.id}
                                            value={String(type.id)}
                                        >
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.type_id && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.type_id}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Total Seat
                            </label>
                            <Input
                                value={form.total_seat}
                                onChange={(e) =>
                                    handleChange("total_seat", e.target.value)
                                }
                                placeholder="Enter Total Seat"
                                type="number"
                            />
                            {errors.total_seat && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.total_seat}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Gear System
                            </label>
                            <Select
                                value={form.gear_system}
                                onValueChange={(value) =>
                                    handleChange("gear_system", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Gear System" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Auto">Auto</SelectItem>
                                    <SelectItem value="Manual">
                                        Manual
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gear_system && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.gear_system}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Fuel Type
                            </label>
                            <Select
                                value={form.fuel_type}
                                onValueChange={(value) =>
                                    handleChange("fuel_type", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Fuel Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Petrol">
                                        Petrol
                                    </SelectItem>
                                    <SelectItem value="Diesel">
                                        Diesel
                                    </SelectItem>
                                    <SelectItem value="Electric">
                                        Electric
                                    </SelectItem>
                                    <SelectItem value="Hybrid">
                                        Hybrid
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.fuel_type && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.fuel_type}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Engine HP
                            </label>
                            <Input
                                value={form.engine_hp}
                                onChange={(e) =>
                                    handleChange("engine_hp", e.target.value)
                                }
                                placeholder="Enter Engine HP"
                                type="number"
                            />
                            {errors.engine_hp && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.engine_hp}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Car Color
                            </label>
                            <Input
                                value={form.color}
                                onChange={(e) =>
                                    handleChange("color", e.target.value)
                                }
                                placeholder="Enter Car Color"
                            />
                            {errors.color && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.color}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Car Number
                            </label>
                            <Input
                                value={form.car_number}
                                onChange={(e) =>
                                    handleChange("car_number", e.target.value)
                                }
                                placeholder="Enter Car Number"
                            />
                            {errors.car_number && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.car_number}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">
                                Rental Price (Rp)
                            </label>
                            <Input
                                value={form.rental_price}
                                onChange={(e) =>
                                    handleChange("rental_price", e.target.value)
                                }
                                placeholder="Enter Rental Price"
                                type="number"
                            />
                            {errors.rental_price && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.rental_price}
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
                            placeholder="Enter Car Description"
                            rows={4}
                        />
                        {errors.desc && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.desc}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get("/cars")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save Car</Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
