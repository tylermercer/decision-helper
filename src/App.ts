import { header, a, main, div, Observable } from 'markup-as-js';
import routes from './routes';

const App = (currentPath: Observable<string>) => {

  currentPath.subscribe((path: string) => {
    document.querySelector('.nav .tabs .active')?.classList.remove('active');
    document.querySelector(`.nav .tabs a[href="${path}"]`)?.classList.add('active');
  });

  return main(
    header(
      div(
        {class:"nav"},
        div({class:"nav-left"}, a({class:"brand", href: "/"}, "Volit")),
        div({class:"nav-right tabs"},
          ...routes
            .filter(r => r.nav)
            .map(r => a({href:r.path}, r.label))
        )
      )
    ),
    div({id: "route"})
  );
}

export default App;