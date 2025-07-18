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

export default function EditProfilePage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameLoading, setNameLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [nameSuccess, setNameSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const supabase = createClient();

    const handleChangeName = async () => {
        setNameLoading(true);
        setNameError(null);
        setNameSuccess(false);

        const { error } = await supabase.auth.updateUser({
            data: { full_name: name },
        });

        if (error) {
            setNameError(error.message);
        } else {
            setNameSuccess(true);
            setName("");
        }
        setNameLoading(false);
    };

    const handleChangePassword = async () => {
        setPasswordLoading(true);
        setPasswordError(null);
        setPasswordSuccess(false);

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setPasswordError(error.message);
        } else {
            setPasswordSuccess(true);
            setPassword("");
        }
        setPasswordLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Change Name</CardTitle>
                    <CardDescription>Enter your new name below.</CardDescription>
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
                    {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                    {nameSuccess && (
                        <p className="text-green-500 text-sm">Name updated successfully!</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleChangeName} className="w-full" disabled={nameLoading}>
                        {nameLoading ? <Spinner /> : "Change Name"}
                    </Button>
                </CardFooter>
            </Card>

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Change Password</CardTitle>
                    <CardDescription>Enter your new password below.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                    )}
                    {passwordSuccess && (
                        <p className="text-green-500 text-sm">
                            Password updated successfully!
                        </p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleChangePassword}
                        className="w-full"
                        disabled={passwordLoading}
                    >
                        {passwordLoading ? <Spinner /> : "Change Password"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
} 