import { create } from 'zustand';

// Define the Event type
export interface UEvent {
  id: string;
  title: string;
  date: number;
  description: string;
  categoryId?: number;
  location: string;
}

// Define the store state
interface EventStore {
  userId?: string;
  events: UEvent[];
  addEvent: (event: Omit<UEvent, 'id'>) => void;
  updateEvent: (id: string, updatedEvent: Partial<UEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => UEvent | undefined;
  initialize: (userId: string) => void;
}

// Create the Zustand store
const useEventStore = create<EventStore>((set, get) => {
  return {
    events: [],
    addEvent: (event) => {
      set((state) => ({
        events: [...state.events, { ...event, id: Date.now().toString() }],
      }));
      if (get().userId) {
        localStorage.setItem(get().userId!, JSON.stringify(get().events));
      }
    },

    updateEvent: (id, updatedEvent) =>
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        ),
      })),

    deleteEvent: (id) => {
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
      }));
      if (get().userId) {
        localStorage.setItem(get().userId!, JSON.stringify(get().events));
      }
    },

    getEventById: (id) => get().events.find((event) => event.id === id),

    initialize: (userId: string) => {
      const events = JSON.parse(localStorage.getItem(userId) || '[]');
      console.log('events', events);
      set({
        userId: userId,
        events,
      });
    },
  };
});

export default useEventStore;
