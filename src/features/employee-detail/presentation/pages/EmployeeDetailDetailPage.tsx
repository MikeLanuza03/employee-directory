import { useState } from "react";
import {
  useGetEmployeeDetailByIdQuery,
  useUpdateEmployeeDetailMutation,
  useGetDepartmentsQuery,
} from "../../data/employee-detailApi";
import EmployeeDetailForm from "../components/EmployeeDetailForm";
import type { EmployeeDetail } from "../../domain/employee-detail.types";

interface EmployeeDetailDetailPageProps {
  employeeId: number;
}

export default function EmployeeDetailDetailPage({
  employeeId,
}: EmployeeDetailDetailPageProps) {
  const {
    data: employee,
    isLoading,
    error,
  } = useGetEmployeeDetailByIdQuery(employeeId);
  const { data: departments = [] } = useGetDepartmentsQuery();
  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeDetailMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (
    data: Omit<EmployeeDetail, "id">
  ) => {
    setSuccessMessage(null);
    await updateEmployee({ id: employeeId, ...data }).unwrap();
    setSuccessMessage("Employee updated successfully.");
  };

  if (isLoading) {
    return (
      <p className="py-10 text-center text-gray-500">
        Loading employee details...
      </p>
    );
  }

  if (error || !employee) {
    return (
      <p className="py-10 text-center text-red-500">
        Failed to load employee details.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {employee.firstName} {employee.lastName}
      </h1>

      {successMessage && (
        <p className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </p>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <EmployeeDetailForm
          defaultValues={employee}
          departments={departments}
          onSubmit={handleSubmit}
          isSubmitting={isUpdating}
        />
      </div>
    </section>
  );
}
