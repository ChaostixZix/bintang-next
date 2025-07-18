"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async () => {
        setLoading(true);
        setError(null);
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push("/");
        }
        setLoading(false);
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // You might want to show a success message or redirect
            alert("Check your email for a confirmation link!");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button onClick={handleSignIn} className="w-full" disabled={loading}>
                        {loading ? <Spinner /> : "Sign in"}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Button
                            onClick={handleSignUp}
                            variant="link"
                            className="p-0"
                            disabled={loading}
                        >
                            Sign up
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
} 