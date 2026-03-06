import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Employee } from "../../domain/employee.types";

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("position", {
    header: "Position",
  }),
  columnHelper.accessor("department", {
    header: "Department",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const label = status.charAt(0).toUpperCase() + status.slice(1);
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              status === "active" ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          {label}
        </span>
      );
    },
  }),
];

interface EmployeesTableProps {
  employees: Employee[];
  onSelectEmployee?: (id: number) => void;
}

export default function EmployeesTable({ employees, onSelectEmployee }: EmployeesTableProps) {
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-sm text-gray-500"
              >
                No employees found.
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`even:bg-gray-50 hover:bg-gray-100 ${onSelectEmployee ? "cursor-pointer" : ""}`}
              tabIndex={onSelectEmployee ? 0 : undefined}
              onClick={() => onSelectEmployee?.(row.original.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectEmployee?.(row.original.id);
                }
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
