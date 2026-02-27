import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { EmployeeDetail, Department } from "../../domain/employee-detail.types";

const employeeDetailSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(1, "Position is required"),
  department: z.string().min(1, "Department is required"),
  startDate: z.string().min(1, "Start date is required"),
  status: z.enum(["active", "inactive"]),
});

type EmployeeDetailFormValues = z.infer<typeof employeeDetailSchema>;

interface EmployeeDetailFormProps {
  defaultValues?: EmployeeDetail;
  departments: Department[];
  onSubmit: (data: EmployeeDetailFormValues) => void;
  isSubmitting?: boolean;
}

export default function EmployeeDetailForm({
  defaultValues,
  departments,
  onSubmit,
  isSubmitting,
}: EmployeeDetailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeDetailFormValues>({
    resolver: zodResolver(employeeDetailSchema),
    defaultValues: defaultValues
      ? {
          firstName: defaultValues.firstName,
          lastName: defaultValues.lastName,
          email: defaultValues.email,
          position: defaultValues.position,
          department: defaultValues.department,
          startDate: defaultValues.startDate,
          status: defaultValues.status,
        }
      : { status: "active" },
  });

  const inputClass =
    "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const errorClass = "mt-1 text-xs text-red-600";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>First Name</label>
          <input {...register("firstName")} className={inputClass} />
          {errors.firstName && (
            <p className={errorClass}>{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Last Name</label>
          <input {...register("lastName")} className={inputClass} />
          {errors.lastName && (
            <p className={errorClass}>{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input type="email" {...register("email")} className={inputClass} />
        {errors.email && (
          <p className={errorClass}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Position</label>
        <input {...register("position")} className={inputClass} />
        {errors.position && (
          <p className={errorClass}>{errors.position.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Department</label>
          <select {...register("department")} className={inputClass}>
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className={errorClass}>{errors.department.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Start Date</label>
          <input type="date" {...register("startDate")} className={inputClass} />
          {errors.startDate && (
            <p className={errorClass}>{errors.startDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Status</label>
        <select {...register("status")} className={inputClass}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className={errorClass}>{errors.status.message}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : defaultValues ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
}
