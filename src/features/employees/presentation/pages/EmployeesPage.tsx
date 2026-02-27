import { useGetEmployeesQuery } from "../../data/employeesApi";
import EmployeesTable from "../components/EmployeesTable";

export default function EmployeesPage() {
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
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Employees</h1>
      {employees && <EmployeesTable employees={employees} />}
    </section>
  );
}
