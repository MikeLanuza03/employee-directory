import { useState } from "react";
import EmployeesPage from "./features/employees/presentation/pages/EmployeesPage";
import EmployeeDetailDetailPage from "./features/employee-detail/presentation/pages/EmployeeDetailDetailPage";
import AddEmployeePage from "./features/employees/presentation/pages/AddEmployeePage";

type View = "list" | "detail" | "add";

function App() {
  const [view, setView] = useState<View>("list");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const goToList = () => {
    setView("list");
    setSelectedEmployeeId(null);
  };

  const goToDetail = (id: number) => {
    setSelectedEmployeeId(id);
    setView("detail");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {view === "detail" && selectedEmployeeId !== null ? (
        <>
          <div className="mx-auto max-w-2xl px-4 pt-6">
            <button
              onClick={goToList}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              &larr; Back to list
            </button>
          </div>
          <EmployeeDetailDetailPage employeeId={selectedEmployeeId} />
        </>
      ) : view === "add" ? (
        <>
          <div className="mx-auto max-w-2xl px-4 pt-6">
            <button
              onClick={goToList}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              &larr; Back to list
            </button>
          </div>
          <AddEmployeePage onBack={goToList} />
        </>
      ) : (
        <EmployeesPage
          onSelectEmployee={goToDetail}
          onAddEmployee={() => setView("add")}
        />
      )}
    </div>
  );
}

export default App;
