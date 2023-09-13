import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useAddEmployee } from './useAddEmployee';
import { Employee } from '@/types';
import { useSearchParams } from 'react-router-dom';
import { useUpdateEmployee } from './useUpdateEmployee';

export default function EmployeeForm({
  updateSessionId,
  updateValues = {} as Employee,
}: {
  updateSessionId?: number;
  updateValues?: Employee;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const formSchema = z.object({
    name: z.string().min(2).max(40).optional(),
    surname: z.string().min(2).max(40).optional(),
    avatar: z.string().optional(),
    date_of_birth: z.date(),
    sex: z.string().optional(),
    contract_type: z.string().optional(),
    contract_length: z.number().gte(0).lte(36).optional(),
    department: z.string().optional(),
    contract_start_date: z.date(),
    vacation_days: z.number().optional(),
    free_days: z.number().optional(),
    paid_leave_days: z.number().optional(),
  });

  const defaultValues = updateSessionId
    ? {
        ...updateValues,
        date_of_birth: new Date(updateValues.date_of_birth),
        contract_start_date: new Date(updateValues.contract_start_date),
      }
    : {
        name: '',
        surname: '',
        avatar: '',
        date_of_birth: new Date(),

        sex: '',
        contract_type: '',
        contract_length: 0,
        contract_start_date: new Date(),
        department: '',

        vacation_days: 0,
        free_days: 0,
        paid_leave_days: 0,
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const { addEmployee } = useAddEmployee();
  const { updateEmployee } = useUpdateEmployee();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (updateSessionId) {
      updateEmployee({ updateSessionId, employee: values as Employee });
    } else {
      addEmployee(
        { employee: values as Employee },
        {
          onSuccess: (data) => {
            searchParams.set('id', data.id);
            setSearchParams(searchParams);
          },
        },
      );
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-4">
            <div className="bg-slate-50 flex flex-col gap-4 border rounded-sm p-4">
              <div className="text-sm font-semibold uppercase">
                Personal information
              </div>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="https://www.avatar.com/"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-stretch items-start gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="Ivan"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="Horvat"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row justify-stretch items-start gap-4">
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'bg-white min-w-[14rem] flex-1 pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}>
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel>Sex</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-slate-50 flex flex-col gap-4 border rounded-sm p-4">
              <div className="text-sm font-semibold uppercase">
                Contract information
              </div>
              <div className="flex flex-row justify-stretch items-start gap-4">
                <FormField
                  control={form.control}
                  name="contract_type"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Contract type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || 'definite'}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select contract type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="definite">Definite</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contract_length"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Contract length</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="number"
                          placeholder="Duration in months"
                          {...field}
                          onChange={(e) => {
                            const parsedValue = parseInt(e.target.value, 10);
                            field.onChange(parsedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Leave 0 for indefinite length.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row justify-stretch items-start gap-4">
                <FormField
                  control={form.control}
                  name="contract_start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Contract start date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'bg-white min-w-[14rem] flex-1 pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}>
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="Engineering"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-slate-50 flex flex-col gap-4 border rounded-sm p-4">
              <div className="text-sm font-semibold uppercase">
                Contract details
              </div>
              <div className="flex flex-row justify-stretch items-start gap-4">
                <FormField
                  control={form.control}
                  name="vacation_days"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Vacation days</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="number"
                          placeholder="Duration in days"
                          {...field}
                          onChange={(e) => {
                            const parsedValue = parseInt(e.target.value, 10);
                            field.onChange(parsedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paid_leave_days"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Paid leave days</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="number"
                          placeholder="Duration in days"
                          {...field}
                          onChange={(e) => {
                            const parsedValue = parseInt(e.target.value, 10);
                            field.onChange(parsedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="free_days"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Free days</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          type="number"
                          placeholder="Duration in days"
                          {...field}
                          onChange={(e) => {
                            const parsedValue = parseInt(e.target.value, 10);
                            field.onChange(parsedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <Button type="submit">
              {updateSessionId ? 'Update employee' : 'Add employee'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
