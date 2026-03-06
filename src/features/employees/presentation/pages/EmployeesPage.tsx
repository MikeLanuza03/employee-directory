import { useMemo, useState } from "react";
import { useGetEmployeesQuery, useGetDepartmentsQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";

interface EmployeesPageProps {
  onSelectEmployee?: (id: number) => void;
  onAddEmployee?: () => void;
}

export default function EmployeesPage({ onSelectEmployee, onAddEmployee }: EmployeesPageProps) {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];
    if (selectedDepartment === "All") return employees;
    return employees.filter((e) => e.department === selectedDepartment);
  }, [employees, selectedDepartment]);

  if (isLoading) {
    return <p className="py-10 text-center text-gray-500">Loading employees...</p>;
  }

  if (error) {
    return (
      <p className="py-10 text-center text-red-500">
        Failed to load employees. Make sure the mock API is running.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <div className="flex items-center gap-3">
          <label htmlFor="department-filter" className="text-sm font-medium text-gray-700">
            Department:
          </label>
          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All</option>
            {departments?.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          {onAddEmployee && (
            <button
              onClick={onAddEmployee}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Employee
            </button>
          )}
        </div>
      </div>
      <EmployeesTable employees={filteredEmployees} onSelectEmployee={onSelectEmployee} />
    </section>
  );
}
