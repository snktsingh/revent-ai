import React, { useState } from 'react'
import { ErrorPreviewCard, ErrorText } from './style';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

interface ThumbnailPreviewProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  src,
  alt,
  style,
}) => {

  const [errorOccur, setImageErrorOccur] = useState<boolean>(false);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageErrorOccur(true);
  }


  return (
    <>
      {errorOccur ? (
        <ErrorPreviewCard style={style}>
          <ReportGmailerrorredIcon sx={{ fontSize: '3rem', color:'white' }} />
          <ErrorText sx={{mt:'2%'}}>
            Sorry :(
          </ErrorText>
          <ErrorText>
            Preview failed to load!
          </ErrorText>
        </ErrorPreviewCard>
      ) : (
        <img src={src} alt={alt} style={style} onError={handleError} />
      )}
    </>
  );
}

export default ThumbnailPreview;