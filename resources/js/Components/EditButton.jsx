import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

export default function EditButton({ url, label = "Edit", ...props }) {
    return (
        <Button
            size="sm"
            variant="outline"
            onClick={() => router.get(url)}
            {...props}
        >
            {label}
        </Button>
    );
}
