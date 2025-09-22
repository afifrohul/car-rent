import { SiteHeader } from "@/Components/site-header";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { format } from "date-fns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Detail({ transaction }) {
    return (
        <AdminLayout siteHeader={<SiteHeader name="Detail Transactions" />}>
            <Head title="Detail Transactions" />
            <div className="w-full mx-auto flex flex-col gap-4">
                <div className="border rounded-md p-4">
                    <div className="flex justify-between w-full items-center gap-4 p-2">
                        <h2 className="text-base font-medium">
                            Transaction Detail
                        </h2>
                        {transaction.payment_status === "success" ? (
                            <div
                                className={`px-2 py-1 h-fit text-sm rounded text-white bg-green-500`}
                            >
                                {transaction.payment_status}
                            </div>
                        ) : transaction.payment_status === "waiting" ? (
                            <div
                                className={`px-2 py-1 h-fit text-sm rounded text-white bg-yellow-500`}
                            >
                                {transaction.payment_status}
                            </div>
                        ) : (
                            <div
                                className={`px-2 py-1 h-fit text-sm rounded text-white bg-red-500`}
                            >
                                {transaction.payment_status}
                            </div>
                        )}
                    </div>
                    <Separator></Separator>
                    <div className="grid grid-cols-2 lg:gap-64 mt-4">
                        <div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Customer Name</p>
                                <p>{transaction.user.name}</p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Customer Email</p>
                                <p>{transaction.user.email}</p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Start Rent Time</p>
                                <p>
                                    {format(
                                        new Date(transaction.start_time),
                                        "MMMM dd, yyyy H:ii:ss"
                                    )}
                                </p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">End Rent Time</p>
                                <p>
                                    {format(
                                        new Date(transaction.end_time),
                                        "MMMM dd, yyyy H:ii:ss"
                                    )}
                                </p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Total Hours</p>
                                <p>{transaction.total_hours} </p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">
                                    Price per Hour (Rp)
                                </p>
                                <p>{transaction.price_per_hour} </p>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Issued Date</p>
                                <p>
                                    {format(
                                        new Date(transaction.created_at),
                                        "MMMM dd, yyyy H:ii:ss"
                                    )}
                                </p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Order ID</p>
                                <p>{transaction.midtrans_order_id}</p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Transaction ID</p>
                                <p>{transaction.midtrans_transaction_id}</p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Payment Method</p>
                                <p>
                                    {transaction.payment_method ? (
                                        <span>
                                            {transaction.payment_method}
                                        </span>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </p>
                            </div>
                            <div className="text-sm flex justify-between">
                                <p className="font-semibold">Payment Type</p>
                                <p>
                                    {transaction.payment_type ? (
                                        <span>{transaction.payment_type}</span>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-4"></Separator>
                    <div className="grid grid-cols-4 text-sm font-semibold">
                        <div>Product</div>
                        <div>Price(Rp)</div>
                        <div>Amount</div>
                        <div>Subtotal (Rp)</div>
                    </div>
                    <div className="grid grid-cols-4 text-sm">
                        <div>
                            <p>Car Name: {transaction.car_name}</p>
                            <p>Car Brand: {transaction.car_brand}</p>
                            <p>Car Type: {transaction.car_type}</p>
                        </div>
                        <div>{transaction.price_per_hour}</div>
                        <div>{transaction.total_hours}</div>
                        <div>{transaction.subtotal}</div>
                    </div>
                    <div className="grid grid-cols-4 text-sm">
                        <div>
                            <p>
                                Discount Code:{" "}
                                {transaction.discount_code ? (
                                    <span>{transaction.discount_code}</span>
                                ) : (
                                    <span>-</span>
                                )}
                            </p>
                        </div>
                        <div>
                            {transaction.discount_value ? (
                                <span>{transaction.discount_value}</span>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                        <div>
                            {transaction.discount_code ? (
                                <span>1</span>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                        <div>
                            {transaction.discount_code ? (
                                <span>-{transaction.discount_value}</span>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                    </div>
                    <Separator className="my-4"></Separator>
                    <div className="grid grid-cols-4 text-sm">
                        <div></div>
                        <div></div>
                        <div>
                            <p className="font-semibold">Total (Rp)</p>
                        </div>
                        <div>Rp{transaction.total_price}</div>
                    </div>
                </div>

                <div className="border rounded-md p-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Midtrans Payload
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                {transaction.midtrans_payload ? (
                                    <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap break-all">
                                        <code>
                                            {JSON.stringify(
                                                transaction.midtrans_payload,
                                                null,
                                                2
                                            )}
                                        </code>
                                    </pre>
                                ) : (
                                    <span>-</span>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                >
                    Back
                </Button>
            </div>
        </AdminLayout>
    );
}
