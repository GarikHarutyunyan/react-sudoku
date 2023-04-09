import {Link} from 'react-router-dom';

export const Home = () => {
  return (
    <h1>
      <Link to={'/levels'}>{'Play'}</Link>
    </h1>
  );
};
