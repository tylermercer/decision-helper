import Main from './routes/MainPage';
import About from './routes/AboutPage';

type Route = {
  path: string,
  label: string,
  builder: (ctx: PageJS.Context, next: () => any) => Element,
  nav: boolean
}

const routes: Route[] = [
  {
    path: '/',
    label: 'Home',
    builder: Main,
    nav: true,
  },
  {
    path: '/about',
    label: 'About',
    builder: About,
    nav: true
  },
];

export default routes;