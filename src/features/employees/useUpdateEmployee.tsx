import { useMutation, useQueryClient } from 'react-query';
import { updateEmploye as updateEmployeApi } from './../../services/apiEmployees';
import { Employee } from '@/types';

function useUpdateEmployee() {
  const queryClient = useQueryClient();
  const {
    mutate: updateEmployee,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({
      updateSessionId,
      employee,
    }: {
      updateSessionId: number;
      employee: Employee;
    }) => updateEmployeApi({ updateSessionId, employee }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee'] });
    },
  });

  return { updateEmployee, isLoading, error };
}

export { useUpdateEmployee };
