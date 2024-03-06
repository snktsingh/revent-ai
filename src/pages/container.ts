import { useRef } from 'react';

const useRedirect = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ContactRef = useRef<HTMLDivElement>(null);
  const ourMissionRef = useRef<HTMLDivElement>(null);
  const mAboutRef = useRef<HTMLDivElement>(null);
  const mServicesRef = useRef<HTMLDivElement>(null);
  const mContactRef = useRef<HTMLHRElement>(null);
  const getStartedRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const handleAbout = () => {
    if (aboutRef.current) {
      const headerHeight = 120; 
      const elementPosition =
        aboutRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', 
      });
    }
  };
  const handleServices = () => {
    if (servicesRef.current) {
      const headerHeight = 110; 
      const elementPosition =
        servicesRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', 
      });
    }
  };
  const handleContact = () => {
    if (ContactRef.current) {
      const headerHeight = 70; 
      const elementPosition =
        ContactRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', 
      });
    }
  };

  const handleOurMission = () => {
    if (ourMissionRef.current) {
      const headerHeight = 150; 
      const elementPosition =
        ourMissionRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', 
      });
    }
  };

  const handleGetStarted = () => {
    if (getStartedRef.current) {
      const headerHeight = 150; 
      const elementPosition =
        getStartedRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', 
      });
    }
  };

  const handleHowItWorks = () => {
    if (howItWorksRef.current) {
      const headerHeight = 150; 
      const elementPosition =
        howItWorksRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', 
      });
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
    ourMissionRef,
    getStartedRef,
    howItWorksRef,
    handleMAbout,
    handleMServices,
    handleMContact,
    handleAbout,
    handleServices,
    handleContact,
    handleOurMission,
    handleGetStarted,
    handleHowItWorks
  };
};
export default useRedirect;
