import React, { useState, useEffect, useCallback } from 'react';
import { useCategoryStore } from '../../store/categories';
import useEventStore, { UEvent } from '../../store/events';
import dayjs from 'dayjs';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EventDialog from '@/components/EventDialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import './index.css';
// const mockData = [
//   {
//     id: 1,
//     name: 'Tech Conference 2023',
//     date: '2023-09-15',
//     location: 'San Francisco',
//     description: 'Annual tech conference',
//     category: 'conferences',
//   },
//   {
//     id: 2,
//     name: 'Rock Concert',
//     date: '2023-08-20',
//     location: 'New York',
//     description: 'Live rock music event',
//     category: 'music',
//   },
//   {
//     id: 3,
//     name: 'Web Development Workshop',
//     date: '2023-07-10',
//     location: 'Online',
//     description: 'Learn modern web development',
//     category: 'workshops',
//   },
// ];

const Events: React.FC = () => {
  const { user } = useAuth0();
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [updateCategoryName, setUpdateCategoryName] = useState<string>('');

  const [filteredEvents, setFilteredEvents] = useState<UEvent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false); // Manage dialog open state

  const { events, initialize: initializeEvents, deleteEvent } = useEventStore();
  const {
    categories,
    initialize: initializeCategories,
    addCategory,
    removeCategory,
    updateCategory,
  } = useCategoryStore();

  useEffect(() => {
    initializeEvents(user?.sub || '');
    initializeCategories(user?.sub || '');
  }, [initializeCategories, initializeEvents, user?.sub]);

  const filterEvents = useCallback(() => {
    let filtered = events;

    if (selectedCategory) {
      filtered = filtered.filter(
        (event) => Number(event.categoryId) === Number(selectedCategory)
      );
    }

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(lowercasedSearch) ||
          event.description.toLowerCase().includes(lowercasedSearch)
      );
    }

    console.log('filtered', filtered);
    return setFilteredEvents(filtered);
  }, [events, selectedCategory, searchTerm]);

  useEffect(() => {
    filterEvents();
  }, [selectedCategory, events, searchTerm, filterEvents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const capitalizedUserName = user?.name
    ?.split(' ')
    .map((i) => [i[0].toLocaleUpperCase(), ...i.slice(1)].join(''))
    .join(' ');

  console.log({ filteredEvents, selectedCategory });
  return (
    <div className='events-page'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>
          {capitalizedUserName ? `${capitalizedUserName}'s` : ''} Upcoming
          Events
        </h1>

        <div className='flex flex-col justify-between mb-8'>
          <div className='mb-4 flex justify-between gap-4'>
            <Input
              className='w-full'
              placeholder='Search events...'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setIsOpen(true)}
                >
                  +
                </Button>
              </DialogTrigger>
              {isOpen && <EventDialog close={() => setIsOpen(false)} />}
            </Dialog>
          </div>
          <div className='flex flex-wrap gap-2'>
            <Button key={'all'} variant={'outline'} size='sm'>
              ALL
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={'outline'}
                size='sm'
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <Button key={'add'} variant={'outline'} size='sm'>
                  +
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-80'>
                <div className='grid gap-4'>
                  <div className='grid gap-2'>
                    <div className='grid grid-cols-3 items-center gap-4'>
                      <Input
                        id='category_input'
                        className='col-span-2 h-8'
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newCategoryName) {
                            addCategory({
                              name: newCategoryName,
                              id: Date.now(),
                            });
                            setNewCategoryName('');
                          }
                        }}
                      />
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => {
                          if (newCategoryName) {
                            addCategory({
                              name: newCategoryName,
                              id: Date.now(),
                            });
                            setNewCategoryName('');
                          }
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {selectedCategory && (
              <>
                <Input
                  id='category_input'
                  className='w-24 h-8'
                  value={updateCategoryName}
                  onChange={(e) => setUpdateCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && updateCategoryName.length) {
                      updateCategory(selectedCategory, updateCategoryName);
                      setUpdateCategoryName('');
                    }
                  }}
                />
                <Button
                  key='add_category'
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    updateCategory(selectedCategory, updateCategoryName);
                    setUpdateCategoryName('');
                    setSelectedCategory(undefined);
                  }}
                >
                  ✅
                </Button>
                <Button
                  key='delete_category'
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    removeCategory(selectedCategory);
                    setUpdateCategoryName('');
                    setSelectedCategory(undefined);
                  }}
                >
                  🗑
                </Button>
              </>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredEvents.map((event) => (
            <Card key={event.id} className='eventCard'>
              <CardContent className='p-0'>
                <div className='p-4 relative'>
                  {event.categoryId &&
                    categories.find((c) => c.id === +event.categoryId!) && (
                      <Badge className='mb-2'>
                        {
                          categories.find((c) => c.id === +event.categoryId!)
                            ?.name
                        }
                      </Badge>
                    )}
                  <h3 className='text-xl font-semibold mb-2'>{event.title}</h3>
                  <p className='text-gray-600 mb-2'>
                    {dayjs(event.date).format('YYYY-MM-DD')}
                  </p>
                  <p className='text-gray-600 mb-4'>{event.location}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant='outline' className='w-full'>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px] min-w-[380px] w-1/3 break-all'>
                      <DialogTitle>Description</DialogTitle>
                      <DialogDescription>{event.description}</DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant='outline'
                    size='icon'
                    className='hoverDelBtn absolute top-3 left-3 items-center justify-center w-6 h-6'
                    onClick={() => {
                      deleteEvent(event.id);
                    }}
                  >
                    🗑
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='icon'
                        className='hoverDelBtn absolute top-3 right-3 items-center justify-center w-6 h-6'
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        🛠️
                      </Button>
                    </DialogTrigger>
                    {isOpen && (
                      <EventDialog
                        close={() => setIsOpen(false)}
                        initData={event}
                      />
                    )}
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
