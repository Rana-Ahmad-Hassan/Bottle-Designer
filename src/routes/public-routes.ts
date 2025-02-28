import { TRoute } from '../types/route';
import { routePaths } from '../constants/paths';
import BottleDesigner from '../pages/bottleDesigner';

export const publicRoutes: TRoute[] = [
  {
    name: 'Home',
    path: routePaths.Home,
    component: BottleDesigner,
    exact: true,
  },
];
