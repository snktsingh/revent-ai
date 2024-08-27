import ENDPOINT from '@/constants/endpoint';
import { IFetchPptDetails } from '@/interfaces/pptInterfaces';
import { useAppSelector } from '@/redux/store';
import { FetchUtils } from '@/utils/fetch-utils';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const UsePreview = () => {
  const [presentation, setPresentation] = useState<IFetchPptDetails | null>(
    null
  );
  const [shareUrl, setShareUrl] = useState<string>('');
  const { presentationId } = useAppSelector(state => state.thunk);

  const fetchShareUrl = async () => {
    const previewData = new FormData();
    previewData.append('presentationId', presentationId);
    const res = await FetchUtils.postRequest(
      `${ENDPOINT.PPT.PREVIEW_TOKEN}`,
      previewData
    );
    setShareUrl(res.data);
  };

  const fetchPreview = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const response = await FetchUtils.getRequest(
      `${ENDPOINT.PPT.PREVIEW_PPT}?token=${urlParams.get('token')}`
    );
    setPresentation(response.data);
  };

  return { fetchPreview, presentation, fetchShareUrl, shareUrl };
};
export default UsePreview;
