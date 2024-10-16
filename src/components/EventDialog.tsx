import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCategoryStore } from '@/store/categories';
import { useState } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useEventStore from '@/store/events';

const EventDialog = () => {
  const { categories } = useCategoryStore();
  const { addEvent } = useEventStore();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('all');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      date: dayjs(date).valueOf(),
      location,
      description,
      categoryId: category === 'all' ? undefined : parseInt(category),
      title,
    });
  };

  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Title
          </Label>
          <Input
            id='title'
            value={title}
            className='col-span-3'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='category' className='text-right'>
            Category
          </Label>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>ALL</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='date' className='text-right'>
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <div className='col-span-3'>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? (
                    dayjs(date).format('YYYY-MM-DD')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='location' className='text-right'>
            Location
          </Label>
          <Input
            id='location'
            value={location}
            className='col-span-3'
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='description' className='text-right'>
            Description
          </Label>
          <Textarea
            id='description'
            value={description}
            className='col-span-3'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EventDialog;
