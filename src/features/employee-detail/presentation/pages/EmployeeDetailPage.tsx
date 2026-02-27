import { useGetEmployeeDetailsQuery } from "../../data/employee-detailApi";
import EmployeeDetailTable from "../components/EmployeeDetailTable";

export default function EmployeeDetailPage() {
  const { data: employees, isLoading, error } = useGetEmployeeDetailsQuery();

  if (isLoading) {
    return (
      <p className="py-10 text-center text-gray-500">Loading employees...</p>
    );
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
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Employee Directory
      </h1>
      {employees && <EmployeeDetailTable employees={employees} />}
    </section>
  );
}
