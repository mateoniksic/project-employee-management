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
        <div className="flex flex-row justify-between items-center border-b p-4 font-semibold text-lg bg-gradient-to-r from-blue-50 to-blue-100">
          <div>
            Employee management
            <span className="font-normal text-xs ml-2">(@Mateo Niksic)</span>
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
              <DialogContent>
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
        <div className="p-8 max-w-3xl m-auto">
          {!employeeIsSelected && <EmployeeList />}
          {employeeIsSelected && <EmployeeDetails />}
        </div>
      </div>
    </div>
  );
}
