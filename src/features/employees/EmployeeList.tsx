import { useState } from 'react';
import { Input } from '@/components/ui/input';
import EmployeeCard from './EmployeeCard';
import { useEmployeeList } from './useEmployeeList';

function EmployeeList() {
  const { data } = useEmployeeList();
  const [search, setSearch] = useState('');

  return (
    <div className="h-full flex flex-col p-4 lg:p-0 border-b">
      <div className="pb-4 border-b">
        <Input
          type="text"
          placeholder="Search employees..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="my-4">
        {data
          ?.filter(
            (employee) =>
              [employee.name, employee.surname]
                .join('')
                .toLowerCase()
                .includes(search) && employee,
          )
          .map((employee) => (
            <EmployeeCard
              key={employee.id}
              id={employee.id}
              avatar={employee.avatar}
              name={employee.name}
              surname={employee.surname}
              department={employee.department}
            />
          ))}
      </div>
    </div>
  );
}

export default EmployeeList;
