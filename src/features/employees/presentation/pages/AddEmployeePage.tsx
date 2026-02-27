import { useState } from "react";
import { useGetDepartmentsQuery, useAddEmployeeMutation } from "../../data/employeesApi";
import AddEmployeeForm from "../components/AddEmployeeForm";
import type { AddEmployeeFormValues } from "../components/AddEmployeeForm";

interface AddEmployeePageProps {
  onBack: () => void;
}

export default function AddEmployeePage({ onBack }: AddEmployeePageProps) {
  const { data: departments, isLoading: depsLoading } = useGetDepartmentsQuery();
  const [addEmployee, { isLoading: isSubmitting }] = useAddEmployeeMutation();
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (data: AddEmployeeFormValues) => {
    try {
      await addEmployee(data).unwrap();
      setSuccessMsg("Employee created successfully!");
      setTimeout(onBack, 1500);
    } catch {
      setSuccessMsg("");
    }
  };

  if (depsLoading) {
    return <p className="py-10 text-center text-gray-500">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Add Employee</h1>

      {successMsg && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <AddEmployeeForm
          departments={departments ?? []}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </section>
  );
}
