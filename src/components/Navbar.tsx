import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button asChild variant="ghost">
                        <Link href="/">Home</Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
} 