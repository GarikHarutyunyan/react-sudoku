import {Level} from './pages/level';
import {RouterProvider, createHashRouter} from 'react-router-dom';
import {Levels} from './pages/levels';

const App = () => {
  const router = createHashRouter(
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
    {basename: '/'}
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
