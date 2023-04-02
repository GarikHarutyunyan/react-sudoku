import {Level} from './pages/level';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {Levels} from './pages/levels';
import {basename} from 'path';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Levels />,
      },
      {
        path: '/level/:id',
        element: <Level />,
      },
    ],
    {basename: '/react-sudoku'}
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
