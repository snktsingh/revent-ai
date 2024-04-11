import { useEffect } from 'react';
import {
  Message,
  MessageContainer,
  PreviewContainer,
} from '../emailPreview/style';
import useActivate from './container';

const ActivateAccount = () => {
  const { isActivated } = useActivate();
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const confirmationMessage =
        'Are you sure you want to leave? Your changes may not be saved.';

      event.preventDefault();
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handlePopState = () => {
      window.alert('Back button pressed!');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  if (isActivated) {
    return (
      <PreviewContainer>
        <MessageContainer style={{ height: '20vh' }}>
          <br />
          <h2>Account Successfully Activated</h2>
          <Message>Please close this window.</Message>
          <br />
        </MessageContainer>
      </PreviewContainer>
    );
  }
  return (
    <PreviewContainer>
      <MessageContainer style={{ height: '20vh' }}>
        <br />
        <h2>Activating your account ! Please wait...</h2>
        <Message>
          Please do not click refresh or back button until we verify your
          account.
        </Message>
        <br />
      </MessageContainer>
    </PreviewContainer>
  );
};
export default ActivateAccount;
