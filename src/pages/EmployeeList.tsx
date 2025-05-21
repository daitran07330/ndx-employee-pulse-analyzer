
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Search, Users, PieChart as PieChartIcon, Filter } from "lucide-react";
import PageTitle from "@/components/layout/PageTitle";

// Define types for our data structures
interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  subDepartment: string;
  completed: boolean;
}

interface DepartmentStats {
  name: string;
  completed: number;
  incomplete: number;
  total: number;
  completionRate: number;
}

const EmployeeList: React.FC = () => {
  // Mock data - this would be fetched from an API in a real application
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [totalStats, setTotalStats] = useState({
    total: 0,
    completed: 0,
    incomplete: 0,
    completionRate: 0
  });
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    department: "",
    status: "", // "completed" or "pending"
    position: ""
  });

  useEffect(() => {
    // This would be replaced with an API call in a real application
    const mockEmployees: Employee[] = [];
    const departments = ["HR", "Sales", "Marketing", "Engineering", "Finance", "Operations", "Customer Service", "Research"];
    const subDepartments = {
      "HR": ["Recruitment", "Training", "Employee Relations"],
      "Sales": ["Inside Sales", "Field Sales", "Sales Operations"],
      "Marketing": ["Digital Marketing", "Content", "Events"],
      "Engineering": ["Frontend", "Backend", "DevOps", "QA"],
      "Finance": ["Accounting", "Payroll", "Financial Planning"],
      "Operations": ["Supply Chain", "Logistics", "Facility Management"],
      "Customer Service": ["Support", "Customer Success"],
      "Research": ["R&D", "Innovation"]
    };
    const positions = ["Manager", "Senior Specialist", "Specialist", "Assistant", "Coordinator", "Director", "VP"];
    
    // Generate 1266 employees
    for (let i = 1; i <= 1266; i++) {
      const deptIndex = Math.floor(Math.random() * departments.length);
      const dept = departments[deptIndex];
      const subDepts = subDepartments[dept as keyof typeof subDepartments];
      const subDept = subDepts[Math.floor(Math.random() * subDepts.length)];
      const position = positions[Math.floor(Math.random() * positions.length)];
      const isCompleted = Math.random() > 0.4; // 60% completion rate
      
      mockEmployees.push({
        id: `EMP${String(i).padStart(4, '0')}`,
        name: `Employee Name ${i}`,
        position: `${position}`,
        department: dept,
        subDepartment: subDept,
        completed: isCompleted
      });
    }
    
    setEmployees(mockEmployees);
    setFilteredEmployees(mockEmployees);
    
    // Calculate department statistics
    calculateStats(mockEmployees);
  }, []);

  useEffect(() => {
    // Apply both search and filters
    let result = [...employees];
    
    // Apply search
    if (searchQuery) {
      result = result.filter(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.subDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply department filter
    if (activeFilters.department) {
      result = result.filter(emp => emp.department === activeFilters.department);
    }
    
    // Apply status filter
    if (activeFilters.status) {
      result = result.filter(emp => 
        (activeFilters.status === "completed" && emp.completed) || 
        (activeFilters.status === "pending" && !emp.completed)
      );
    }
    
    // Apply position filter
    if (activeFilters.position) {
      result = result.filter(emp => emp.position === activeFilters.position);
    }
    
    setFilteredEmployees(result);
  }, [searchQuery, employees, activeFilters]);

  const calculateStats = (employeeList: Employee[]) => {
    // Calculate overall statistics
    const total = employeeList.length;
    const completed = employeeList.filter(emp => emp.completed).length;
    const incomplete = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    setTotalStats({
      total,
      completed,
      incomplete,
      completionRate
    });
    
    // Calculate department statistics
    const deptMap = new Map<string, { completed: number, incomplete: number, total: number }>();
    
    employeeList.forEach(emp => {
      if (!deptMap.has(emp.department)) {
        deptMap.set(emp.department, { completed: 0, incomplete: 0, total: 0 });
      }
      
      const deptStats = deptMap.get(emp.department)!;
      deptStats.total++;
      
      if (emp.completed) {
        deptStats.completed++;
      } else {
        deptStats.incomplete++;
      }
    });
    
    const deptStats: DepartmentStats[] = [];
    deptMap.forEach((stats, dept) => {
      deptStats.push({
        name: dept,
        completed: stats.completed,
        incomplete: stats.incomplete,
        total: stats.total,
        completionRate: Math.round((stats.completed / stats.total) * 100)
      });
    });
    
    // Sort by completion rate ascending (worst performing first)
    deptStats.sort((a, b) => a.completionRate - b.completionRate);
    
    setDepartmentStats(deptStats);
  };
  
  // Get unique departments, positions for filters
  const uniqueDepartments = Array.from(new Set(employees.map(emp => emp.department)));
  const uniquePositions = Array.from(new Set(employees.map(emp => emp.position)));
  
  // Helper to handle filter clicks
  const toggleFilter = (type: 'department' | 'status' | 'position', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? "" : value
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      department: "",
      status: "",
      position: ""
    });
    setSearchQuery("");
  };
  
  // Colors for the charts
  const COLORS = ['#4CAF50', '#F44336'];

  return (
    <div className="container mx-auto py-8 px-4">
      <PageTitle 
        title="Employee Survey Dashboard" 
        description="Track and analyze survey completion status across departments"
      />
      
      {/* Overview Stats - Simplified to 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.total}</div>
            <p className="text-xs text-muted-foreground">Registered in the system</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <div className="h-4 w-4 rounded-full bg-promoter" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.completed}</div>
            <p className="text-xs text-muted-foreground">{totalStats.completionRate}% completion rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="h-4 w-4 rounded-full bg-detractor" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.incomplete}</div>
            <p className="text-xs text-muted-foreground">Surveys not yet completed</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Area - Combined Chart and Department Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Overall Completion Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overall Completion Status</CardTitle>
            <CardDescription>Completed vs Pending Surveys</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Completed', value: totalStats.completed },
                    { name: 'Pending', value: totalStats.incomplete }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {[0, 1].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Departments Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Progress</CardTitle>
            <CardDescription>Survey completion status by department</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentStats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                <Legend />
                <Bar dataKey="completionRate" name="Completion Rate" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Employee List with Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Employee Survey Status</CardTitle>
              <CardDescription>
                {filteredEmployees.length} employees | {filteredEmployees.filter(e => e.completed).length} completed
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Section */}
          <div className="mb-4 border rounded-md p-4 bg-muted/30">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                className="ml-auto"
              >
                Reset
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Department Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Department</h4>
                <div className="flex flex-wrap gap-1">
                  {uniqueDepartments.slice(0, 5).map(dept => (
                    <Badge 
                      key={dept}
                      variant={activeFilters.department === dept ? "default" : "outline"} 
                      className="cursor-pointer"
                      onClick={() => toggleFilter('department', dept)}
                    >
                      {dept}
                    </Badge>
                  ))}
                  {uniqueDepartments.length > 5 && (
                    <Badge variant="secondary">+{uniqueDepartments.length - 5} more</Badge>
                  )}
                </div>
              </div>
              
              {/* Position Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Position</h4>
                <div className="flex flex-wrap gap-1">
                  {uniquePositions.map(position => (
                    <Badge 
                      key={position}
                      variant={activeFilters.position === position ? "default" : "outline"} 
                      className="cursor-pointer"
                      onClick={() => toggleFilter('position', position)}
                    >
                      {position}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Status Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Status</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge 
                    variant={activeFilters.status === "completed" ? "default" : "outline"} 
                    className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800"
                    onClick={() => toggleFilter('status', 'completed')}
                  >
                    Completed
                  </Badge>
                  <Badge 
                    variant={activeFilters.status === "pending" ? "default" : "outline"} 
                    className="cursor-pointer bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-800"
                    onClick={() => toggleFilter('status', 'pending')}
                  >
                    Pending
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Employee Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Sub Department</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.slice(0, 10).map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.subDepartment}</TableCell>
                    <TableCell>
                      {employee.completed ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredEmployees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No employees match the selected filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {filteredEmployees.length > 10 && (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                Showing 10 of {filteredEmployees.length} employees
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeList;
