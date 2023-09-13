import { useMutation, useQueryClient } from 'react-query';
import { addEmployee as addEmployeeApi } from './../../services/apiEmployees';
import { Employee } from '@/types';

function useAddEmployee() {
  const queryClient = useQueryClient();
  const {
    mutate: addEmployee,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ employee }: { employee: Employee }) =>
      addEmployeeApi({ employee }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  return { addEmployee, isLoading, error };
}

export { useAddEmployee };
