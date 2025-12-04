'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/");
        }
    }, [router]);

    return (
        <main className="min.h-screen p-6">
            <h1>Dasboard</h1>
            <p>Widgets y playlist</p>
        </main>
    );
}