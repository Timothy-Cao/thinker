import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Tooltip } from '@mui/material';

const Page1 = React.lazy(() => import('./Page1'));
const Page2 = React.lazy(() => import('./Page2'));
const PageDefault = React.lazy(() => import('./PageDefault'));

const PageHandler = () => {
  const { pageNum } = useParams();
  const navigate = useNavigate();

  let PageComponent;
  switch (pageNum) {
    case '1':
      PageComponent = Page1;
      break;
    case '2':
      PageComponent = Page2;
      break;
    default:
      PageComponent = () => <PageDefault pageNum={pageNum}/>;
  }

  const handlePageClick = (page) => {
    navigate(`/page/${page}`);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <PageComponent />
      </React.Suspense>

      <Box
        sx={{
          position: 'fixed',
          bottom: 20, 
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {[...Array(10)].map((_, index) => {
          const page = index + 1;
          return (
            <Tooltip key={page} title={`Page ${page}`} placement="top">
              <Button
                onClick={() => handlePageClick(page)}
                sx={{
                    borderRadius: '8px', 
                    width: 40,
                    height: 40,
                    margin: '0 4px',
                    backgroundColor: pageNum === String(page) ? 'primary.main' : 'grey.400',
                    '&:hover': {
                    backgroundColor: pageNum === String(page) ? 'primary.dark' : 'grey.500',
                  },
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </div>
  );
};

export default PageHandler;
