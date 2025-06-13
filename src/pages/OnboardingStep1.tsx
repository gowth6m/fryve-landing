import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const OnboardingStep1 = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);

            // Store basic info in localStorage for demo
            const existingUser = JSON.parse(
                localStorage.getItem("fryve_user") || "{}"
            );
            localStorage.setItem(
                "fryve_user",
                JSON.stringify({
                    ...existingUser,
                    firstName,
                    lastName,
                    phone,
                })
            );

            toast({
                title: "Basic info saved",
                description: "Let's continue with your business setup",
            });

            navigate("/onboarding/step2");
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                            Step 1 of 2
                        </span>
                        <span className="text-sm text-gray-600">50%</span>
                    </div>
                    <Progress value={50} className="h-2" />
                </div>

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center">
                        <img
                            src="/logo.svg"
                            alt="Fryve Logo"
                            className="w-10 h-10"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gradient">
                        Tell us about yourself
                    </h1>
                    <p className="text-gray-600">
                        Let's start with some basic information
                    </p>
                </div>

                <Card className="border-orange-200 shadow-lg">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            This information will be used to create your profile
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full gradient-fryve text-white border-0"
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : "Continue"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OnboardingStep1;
