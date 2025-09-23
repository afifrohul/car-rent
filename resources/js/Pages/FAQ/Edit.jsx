import { SiteHeader } from "@/Components/site-header";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Textarea } from "@/components/ui/textarea";

export default function Edit({ faq }) {
    const { errors } = usePage().props;
    const [form, setForm] = useState({
        question: faq.question || "",
        answer: faq.answer || "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(`/faqs/${faq.id}`, {
            ...form,
        });
    };

    return (
        <AdminLayout siteHeader={<SiteHeader name="Edit FAQ" />}>
            <Head title="Edit FAQ" />
            <div className="container w-full">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 border p-6 rounded-lg"
                >
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Question
                        </label>
                        <Textarea
                            value={form.question}
                            onChange={(e) =>
                                handleChange("question", e.target.value)
                            }
                            placeholder="Enter Question"
                            rows={4}
                        />
                        {errors.question && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.question}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Answer
                        </label>
                        <Textarea
                            value={form.answer}
                            onChange={(e) =>
                                handleChange("answer", e.target.value)
                            }
                            placeholder="Enter Answer"
                            rows={4}
                        />
                        {errors.answer && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.answer}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get("/faqs")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Update FAQ</Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
