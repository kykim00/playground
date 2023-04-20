import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { logger } from '.';

interface Navigation {
  id: string;
  name: string;
  route: string;
}

interface State {
  navigations: Navigation[];
  currentID?: string;
  lastID?: string;
}

interface Action {
  open: (name: string, route: string) => void;
  close: (id: string) => void;
}

const homeID = nanoid();

const useNavigationStore = create<State & Action>()(
  persist(
    logger(set => ({
      navigations: [
        {
          id: homeID,
          name: '홈',
          route: '/',
        },
      ],
      currentID: homeID,
      open: (name, route) =>
        set(state => {
          const targetNavigation = state.navigations.find(nav => nav.route === route);

          if (!targetNavigation) {
            const newID = nanoid();

            return {
              navigations: [
                ...state.navigations,
                {
                  id: newID,
                  name,
                  route,
                },
              ],
              currentID: newID,
            };
          }

          return {
            currentID: targetNavigation.id,
          };
        }),
      close: id =>
        set(state => {
          const remainingNavigations = state.navigations.filter(navigation => navigation.id !== id);

          return {
            navigations: remainingNavigations,
            currentID: remainingNavigations.slice(-1)[0]?.id,
          };
        }),
    })),
    {
      name: 'navigation-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useNavigations = () => useNavigationStore(state => state.navigations);
export const useCurrentID = () => useNavigationStore(state => state.currentID);
export const useCurrentName = () =>
  useNavigationStore(state => state.navigations.find(nav => nav.id === state.currentID))?.name;

export default useNavigationStore;
