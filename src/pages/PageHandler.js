import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Page1 = React.lazy(() => import('./Page1')); 
const Page2 = React.lazy(() => import('./Page2'));  

const PageHandler = () => {
  const { pageNum } = useParams();
  const navigate = useNavigate();

  const goToNextPage = () => {
    const nextPage = parseInt(pageNum) + 1;
    navigate(`/page/${nextPage}`);
  };

  const goToPreviousPage = () => {
    const prevPage = parseInt(pageNum) - 1;
    if (prevPage >= 1) {
      navigate(`/page/${prevPage}`);
    }
  };

  let PageComponent;
  switch (pageNum) {
    case '1':
      PageComponent = Page1;
      break;
    case '2':
      PageComponent = Page2;
      break;
    default:
      PageComponent = () => <p>Page not found.</p>;
  }

  return (
    <div>
      <h2>Page {pageNum}</h2>
      <React.Suspense fallback={<div>Loading...</div>}>
        <PageComponent />
      </React.Suspense>
      <div>
        <Button onClick={goToPreviousPage} disabled={pageNum === '1'}>
          Previous
        </Button>
        <Button onClick={goToNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PageHandler;
