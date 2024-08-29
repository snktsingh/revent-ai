import { useEffect } from 'react';
import UsePreview from './container';
import { Favicon, Logo } from '@/constants/media';
import { Box, Button, Fab } from '@mui/material';

const PreviewPresentation = () => {
  const { fetchPreview, presentation } = UsePreview();

  useEffect(() => {
    fetchPreview();
  }, []);
  return (
    <Box>
      <div
        style={{
          height: '8vh',
          boxShadow:
            '0px 8px 12px rgba(18, 3, 62, 0.1), 0px 0px 1px rgba(18, 3, 62, 0.1)',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          padding: '0% 2%',
          position: 'fixed',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <img src={Favicon} width="2%" style={{ marginRight: '20px' }} />
          <h4 style={{ width: '100%' }}>
            {presentation?.name.replaceAll('+', ' ')}
          </h4>{' '}
        </Box>
        <Box
          style={{
            margin: '1% 0% 1% 0%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Made with <img src={Logo} width="40%" style={{ marginLeft: '2%' }} />
        </Box>
      </div>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {presentation?.slides.map((slides, index) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={slides.variants[0].thumbnailUrl}
                width="80%"
                style={{
                  margin: '7% 3% 0% 3%',
                  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                }}
              />
            </div>
          );
        })}
      </Box>
    </Box>
  );
};
export default PreviewPresentation;
