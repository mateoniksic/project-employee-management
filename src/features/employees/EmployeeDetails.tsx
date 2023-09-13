import EmployeeForm from './EmployeeForm';
import { useEmployee } from './useEmployee';

function EmployeeDetails() {
  const { data: { id: updateSessionId, ...updateValues } = {}, isLoading } =
    useEmployee();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-8">Summary view</h1>
      <EmployeeForm
        updateSessionId={updateSessionId}
        updateValues={updateValues}
      />
    </div>
  );
}

export default EmployeeDetails;
