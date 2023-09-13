import supabase from './supabase';
import { Employee } from '@/types';

export async function getEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('id', { ascending: false });

  if (error) throw new Error('There was a problem while fetching data.');

  return data;
}

export async function getEmployee({ employeeId }: { employeeId: number }) {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', employeeId)
    .select()
    .single();

  if (error) throw new Error('There was a problem while fetching data.');

  return data;
}

export async function addEmployee({ employee }: { employee: Employee }) {
  const { data, error } = await supabase
    .from('employees')
    .insert([employee])
    .select()
    .single();

  if (error) throw new Error('There was a problem while creating data.');

  return data;
}

export async function updateEmploye({
  updateSessionId,
  employee,
}: {
  updateSessionId: number;
  employee: Employee;
}) {
  const { data, error } = await supabase
    .from('employees')
    .update(employee)
    .eq('id', updateSessionId)
    .select()
    .single();

  if (error) throw new Error('There was a problem while updating data.');

  return data;
}

export async function deleteEmploye(id: string) {
  const { data, error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);

  if (error) throw new Error('There was a problem while deleting data.');

  return data;
}
