import { useQuery } from 'react-query';
import { getEmployees as getEmployeesApi } from '@/services/apiEmployees';

function useEmployeeList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getEmployeesApi(),
  });

  return { data, isLoading, error };
}

export { useEmployeeList };
