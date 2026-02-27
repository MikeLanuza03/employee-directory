import { useGetEmployeesQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";

interface EmployeesPageProps {
  onSelectEmployee?: (id: number) => void;
  onAddEmployee?: () => void;
}

export default function EmployeesPage({ onSelectEmployee, onAddEmployee }: EmployeesPageProps) {
  const { data: employees, isLoading, error } = useGetEmployeesQuery();

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
        {onAddEmployee && (
          <button
            onClick={onAddEmployee}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Employee
          </button>
        )}
      </div>
      {employees && (
        <EmployeesTable employees={employees} onSelectEmployee={onSelectEmployee} />
      )}
    </section>
  );
}
