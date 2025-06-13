
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, BarChart3, Settings, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("fryve_user") || "{}");
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fryve_user");
    navigate("/");
  };

  // Mock data for demo
  const teamStats = {
    totalEmployees: 12,
    clockedIn: 8,
    onBreak: 2,
    totalHoursToday: 64
  };

  const recentEmployees = [
    { name: "Sarah Johnson", status: "clocked-in", time: "9:00 AM" },
    { name: "Mike Chen", status: "on-break", time: "1:30 PM" },
    { name: "Emma Rodriguez", status: "clocked-out", time: "5:00 PM" },
    { name: "David Kim", status: "clocked-in", time: "2:00 PM" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "clocked-in": return "default";
      case "on-break": return "secondary";
      case "clocked-out": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl gradient-fryve flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Fryve</h1>
                <p className="text-sm text-gray-600">Manager Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamStats.totalEmployees}</div>
              <p className="text-xs text-gray-600">Active team members</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Clocked In
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{teamStats.clockedIn}</div>
              <p className="text-xs text-gray-600">Currently working</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                On Break
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{teamStats.onBreak}</div>
              <p className="text-xs text-gray-600">Taking a break</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Hours Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamStats.totalHoursToday}</div>
              <p className="text-xs text-gray-600">Total hours worked</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Employee
              </CardTitle>
              <CardDescription>Invite new team members</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gradient-fryve text-white border-0">
                Send Invitation
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Create Schedule</CardTitle>
              <CardDescription>Set shifts for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Schedule Builder
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">View Reports</CardTitle>
              <CardDescription>Analyze team performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Team Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle>Recent Employee Activity</CardTitle>
              <CardDescription>Latest clock-ins and status changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEmployees.map((employee, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-gray-600">{employee.time}</p>
                    </div>
                    <Badge variant={getStatusColor(employee.status)}>
                      {employee.status.replace("-", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle>Business Code</CardTitle>
              <CardDescription>Share this code with new employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  FRYVE2024
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Give this code to employees during registration
                </p>
                <Button variant="outline" className="w-full">
                  Copy Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
