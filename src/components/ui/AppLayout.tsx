import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import EmployeeForm from '@/features/employees/EmployeeForm';
import EmployeeList from '@/features/employees/EmployeeList';
import EmployeeDetails from '@/features/employees/EmployeeDetails';

export default function AppLayout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const employeeIsSelected = searchParams.get('id');

  return (
    <div>
      <div className="h-full">
        <div className="flex flex-row flex-wrap items-center justify-between gap-4 border-b bg-gradient-to-r from-blue-50 to-blue-100 p-4 text-lg font-semibold">
          <div>
            Employee management
            <span className="ml-2 text-xs font-normal">(@Mateo Niksic)</span>
          </div>
          {employeeIsSelected ? (
            <Button
              variant="secondary"
              className="bg-white hover:bg-slate-50"
              onClick={() => navigate(-1)}>
              Go back
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add employee</Button>
              </DialogTrigger>
              <DialogContent className="max-h-screen overflow-auto">
                <DialogHeader>
                  <DialogTitle className="mb-4">Add new employee</DialogTitle>
                  <DialogDescription asChild>
                    <EmployeeForm />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="m-auto max-w-3xl p-4">
          {!employeeIsSelected && <EmployeeList />}
          {employeeIsSelected && <EmployeeDetails />}
        </div>
      </div>
    </div>
  );
}
