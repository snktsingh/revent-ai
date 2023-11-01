import { useRef } from 'react';

const useRedirect = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ContactRef = useRef<HTMLDivElement>(null);

  const mAboutRef = useRef<HTMLDivElement>(null);
  const mServicesRef = useRef<HTMLDivElement>(null);
  const mContactRef = useRef<HTMLDivElement>(null);

  const handleAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView(true);
    }
  };
  const handleServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView();
    }
  };
  const handleContact = () => {
    if (ContactRef.current) {
      ContactRef.current.scrollIntoView();
    }
  };
  const handleMAbout = () => {
    if (mAboutRef.current) {
      mAboutRef.current.scrollIntoView();
    }
  };
  const handleMServices = () => {
    if (mServicesRef.current) {
      mServicesRef.current.scrollIntoView();
    }
  };
  const handleMContact = () => {
    if (mContactRef.current) {
      mContactRef.current.scrollIntoView();
    }
  };

  return {
    aboutRef,
    servicesRef,
    ContactRef,
    mAboutRef,
    mServicesRef,
    mContactRef,
    handleMAbout,
    handleMServices,
    handleMContact,
    handleAbout,
    handleServices,
    handleContact,
  };
};
export default useRedirect;
