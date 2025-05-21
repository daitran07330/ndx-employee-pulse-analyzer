
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Search, Users, PieChart as PieChartIcon, BarChart as BarChartIcon } from "lucide-react";
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
    if (searchQuery) {
      const filtered = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.subDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchQuery, employees]);

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
  
  // Colors for the charts
  const COLORS = ['#4CAF50', '#F44336'];

  return (
    <div className="container mx-auto py-8 px-4">
      <PageTitle 
        title="Employee Survey Dashboard" 
        description="Track and analyze survey completion status across departments"
      />
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.completionRate}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-promoter h-2.5 rounded-full" 
                style={{ width: `${totalStats.completionRate}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Department Completion Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Departmental Completion Rates</CardTitle>
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
      </div>
      
      {/* Departments with Lowest Completion */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Departments Needing Attention</CardTitle>
          <CardDescription>Departments with lowest completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentStats.slice(0, 3).map((dept) => (
              <Card key={dept.name} className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{dept.completionRate}% Complete</span>
                    <span className="text-sm font-medium">{dept.completed}/{dept.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-promoter h-2 rounded-full" 
                      style={{ width: `${dept.completionRate}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Employee List */}
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
              </TableBody>
            </Table>
            {filteredEmployees.length > 10 && (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                Showing 10 of {filteredEmployees.length} employees. Export to view all.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeList;
