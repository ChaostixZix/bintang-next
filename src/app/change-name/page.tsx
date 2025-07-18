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

export default function ChangeNamePage() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleChangeName = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const { error } = await supabase.auth.updateUser({
            data: { full_name: name },
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            setName("");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Change Name</CardTitle>
                    <CardDescription>
                        Enter your new name below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">New Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && (
                        <p className="text-green-500 text-sm">
                            Name updated successfully!
                        </p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleChangeName} className="w-full" disabled={loading}>
                        {loading ? <Spinner /> : "Change Name"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
} 