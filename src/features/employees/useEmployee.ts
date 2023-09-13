import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getEmployee as getEmployeeApi } from '@/services/apiEmployees';

function useEmployee() {
  const [searchParams] = useSearchParams();
  const employeeId = Number(searchParams.get('id'));

  const { data, isLoading, error } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => getEmployeeApi({ employeeId }),
  });

  return { data, isLoading, error };
}

export { useEmployee };
