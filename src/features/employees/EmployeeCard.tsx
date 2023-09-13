import { useSearchParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

export default function EmployeeCard({
  id,
  avatar,
  name,
  surname,
  department,
}: {
  id: string;
  avatar: string;
  name: string;
  surname: string;
  department: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    searchParams.set('id', id);
    setSearchParams(searchParams);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center border rounded p-2 mb-4 bg-slate-50  hover:bg-slate-100">
      <Avatar className="flex flex-row justify-center items-center h-12 w-12 shrink-0 overflow-hidden rounded-full border">
        <AvatarImage src={avatar} alt="Avatar" />
        <AvatarFallback>
          {name.split('').at(0)}
          {surname.split('').at(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{`${name} ${surname}`}</p>
        <p className="text-sm text-muted-foreground">{department}</p>
      </div>
    </button>
  );
}
