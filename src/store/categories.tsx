import { create } from 'zustand';

interface Category {
  id: number;
  name: string;
}

interface CategoryStore {
  userId?: string;
  categories: Category[];
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
  updateCategory: (id: number, newName: string) => void;
  initialize: (userId: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  userId: undefined,

  addCategory: (category) => {
    console.log('get().userId', get().userId);
    if (get().userId) {
      localStorage.setItem(
        get().userId + 'categories',
        JSON.stringify([...get().categories, category])
      );
    }
    set((state) => ({
      categories: [...state.categories, category],
    }));
  },

  removeCategory: (id) => {
    if (get().userId) {
      localStorage.setItem(
        get().userId + 'categories',
        JSON.stringify(
          get().categories.filter((category) => category.id !== id)
        )
      );
    }
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== +id),
    }));
  },

  updateCategory: (id, newName) => {
    if (get().userId) {
      localStorage.setItem(
        get().userId + 'categories',
        JSON.stringify(get().categories)
      );
    }
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id ? { ...category, name: newName } : category
      ),
    }));
  },

  initialize: (userId: string) => {
    const categories = JSON.parse(
      localStorage.getItem(userId + 'categories') || '[]'
    );

    set({
      userId: userId,
      categories,
    });
  },
}));
