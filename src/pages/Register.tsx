import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("employee");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        // Simulate registration process
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Account Created",
                description: "Welcome to Fryve! Let's get you set up.",
            });

            // Store user data in localStorage for demo
            localStorage.setItem(
                "fryve_user",
                JSON.stringify({
                    email,
                    role,
                })
            );

            navigate("/onboarding/step1");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <Button variant="ghost" asChild className="mb-6">
                    <Link to="/" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </Button>

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
                        Join Fryve
                    </h1>
                    <p className="text-gray-600">
                        Create your account to get started
                    </p>
                </div>

                <Card className="border-orange-200 shadow-lg">
                    <CardHeader>
                        <CardTitle>Create Account</CardTitle>
                        <CardDescription>
                            Fill in your details to create your Fryve account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>I am a...</Label>
                                <RadioGroup
                                    value={role}
                                    onValueChange={setRole}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="employee"
                                            id="employee"
                                        />
                                        <Label htmlFor="employee">
                                            Employee
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="employer"
                                            id="employer"
                                        />
                                        <Label htmlFor="employer">
                                            Manager/Owner
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button
                                type="submit"
                                className="w-full gradient-fryve text-white border-0"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;
