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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const OnboardingStep2 = () => {
    const [businessAction, setBusinessAction] = useState("create");
    const [businessName, setBusinessName] = useState("");
    const [businessCode, setBusinessCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);

            // Get user data from localStorage
            const existingUser = JSON.parse(
                localStorage.getItem("fryve_user") || "{}"
            );
            localStorage.setItem(
                "fryve_user",
                JSON.stringify({
                    ...existingUser,
                    businessAction,
                    businessName:
                        businessAction === "create" ? businessName : undefined,
                    businessCode:
                        businessAction === "join" ? businessCode : undefined,
                    onboardingComplete: true,
                })
            );

            toast({
                title: "Setup Complete!",
                description: "Welcome to Fryve. Let's get started!",
            });

            // Navigate based on user role
            if (existingUser.role === "employer") {
                navigate("/dashboard/employer");
            } else {
                navigate("/dashboard/employee");
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                            Step 2 of 2
                        </span>
                        <span className="text-sm text-gray-600">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
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
                        Business Setup
                    </h1>
                    <p className="text-gray-600">
                        Connect with your restaurant
                    </p>
                </div>

                <Card className="border-orange-200 shadow-lg">
                    <CardHeader>
                        <CardTitle>Business Information</CardTitle>
                        <CardDescription>
                            Create a new business or join an existing one
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <Label>What would you like to do?</Label>
                                <RadioGroup
                                    value={businessAction}
                                    onValueChange={setBusinessAction}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="create"
                                            id="create"
                                        />
                                        <Label htmlFor="create">
                                            Create a new business
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="join"
                                            id="join"
                                        />
                                        <Label htmlFor="join">
                                            Join an existing business
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {businessAction === "create" && (
                                <div className="space-y-2">
                                    <Label htmlFor="businessName">
                                        Business Name
                                    </Label>
                                    <Input
                                        id="businessName"
                                        type="text"
                                        placeholder="e.g., McDonald's Downtown"
                                        value={businessName}
                                        onChange={(e) =>
                                            setBusinessName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            )}

                            {businessAction === "join" && (
                                <div className="space-y-2">
                                    <Label htmlFor="businessCode">
                                        Business Code
                                    </Label>
                                    <Input
                                        id="businessCode"
                                        type="text"
                                        placeholder="Enter the code provided by your manager"
                                        value={businessCode}
                                        onChange={(e) =>
                                            setBusinessCode(e.target.value)
                                        }
                                        required
                                    />
                                    <p className="text-sm text-gray-500">
                                        Ask your manager for the business code
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full gradient-fryve text-white border-0"
                                disabled={isLoading}
                            >
                                {isLoading ? "Setting up..." : "Complete Setup"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OnboardingStep2;
