import {
    CaravanIcon,
    CarFrontIcon,
    KeySquareIcon,
    LayoutDashboardIcon,
    MapPinIcon,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import ApplicationLogo from "./ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { NavUser } from "@/components/nav-user";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        title: "City",
        url: "/cities",
        icon: MapPinIcon,
    },
    {
        title: "Car Brand",
        url: "/brands",
        icon: KeySquareIcon,
    },
    {
        title: "Car Type",
        url: "/types",
        icon: CaravanIcon,
    },
    {
        title: "Car",
        url: "/cars",
        icon: CarFrontIcon,
    },
];

export function AppSidebar() {
    const currentPath = new URL(location.href).pathname;
    const user = usePage().props.auth.user;
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/">
                                <ApplicationLogo className="block h-6 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                <span className="text-base font-semibold">
                                    Car Rent.
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Master Data</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = currentPath.startsWith(
                                    item.url
                                );
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link href={item.url}>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
