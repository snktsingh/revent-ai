import { setTourStepIndex, toggleTourStarted, toggleTourVisible } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect, useRef, useState } from 'react';
import ReactJoyride, { CallBackProps, EVENTS, STATUS, Step, StoreHelpers } from 'react-joyride';
import { steps } from './steps';
import { theme } from '@/constants/theme';
import { CustomTooltip } from './tooltipTour';
import { PROCESS } from '@/constants/elementNames';
import MyCustomComponent from './steps/addElStep';
import IntroStep from './steps/introStep';
import AddElementStep from './steps/addElStep';
import AddProcessStep from './steps/addProcessStep';
import CustomStep from './steps/customStep';
import ConclusionStep from './steps/conclusionStep';


export const ReactTourComponent = ({ joyrideRef }: { joyrideRef: React.MutableRefObject<StoreHelpers | null> }) => {    
    const { tourStarted, tourStepIndex, tourVisible } = useAppSelector(state => state.slide);
    const { canvasList, activeSlideID } = useAppSelector(state => state.canvas);
    const [index, setIndex] = useState<number>(0);
    const dispatch = useAppDispatch();
    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, index, lifecycle, action, type } = data;
        setIndex(index);
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status) || action === 'close') {
            dispatch(toggleTourStarted(false));
            dispatch(toggleTourVisible(false));
        } else if (lifecycle === 'complete') {
            dispatch(setTourStepIndex(index + 1));
        }

        if (type == "error:target_not_found") {
            dispatch(toggleTourStarted(false));
            dispatch(toggleTourVisible(false));
        }

        if (index === steps.length - 1) {
            dispatch(toggleTourVisible(true)); 
          }
    };

    const handleHelpers = (storeHelper: StoreHelpers) => {
        joyrideRef.current = storeHelper;
    };

    useEffect(() => {
        const firstAddElBtn = document.querySelector('.first-step');
        const fourthRegenerateBtn = document.querySelector('.fourth-step');
        const fifthVariantsSelect = document.querySelector('#variant-card');
        const sixthRefreshVariants = document.querySelector('.sixth-step');
        const addLevelBtn = document.querySelector('.add-level-step');
        const removeLevelBtn = document.querySelector('.remove-level-step');
        const editBtn = document.querySelector('.seventh-step');
        

        const handleFirstAddElBtnClick = () => {
            if (joyrideRef.current) {
                setTimeout(() => {
                    joyrideRef.current?.next();
                }, 500);
            }
        };

        const handleFourthRegenerateBtnClick = () => {
            if (joyrideRef.current) {
                setTimeout(() => {
                    joyrideRef.current?.next();
                }, 8000);
            }
        };

        const handleFifthVariantsSelect = () => {
            joyrideRef.current?.next();
            // if (joyrideRef.current) {
            //     setTimeout(() => {
            //     }, 500);
            // }
        };

        const handleSixthRefreshVariants = () => {
            if (joyrideRef.current) {
                setTimeout(() => {
                    joyrideRef.current?.next();
                }, 8000);
            }
        };

        const handleAddLevelBtn = () => {
            let level =  1;
            (canvasList[activeSlideID - 1].canvas as any).objects.forEach((element : any) => {
                if(element.name.startswith(PROCESS)) {
                    level++;
                }
            });
            if (joyrideRef.current) {
                setTimeout(() => {
                    joyrideRef.current?.next();
                }, 500);
            }
        };

        const handleRemoveLevelBtn = () => {
            if (joyrideRef.current) {
                joyrideRef.current?.next();
                
            }
        };

        const handleEditBtn = () => {
            if (joyrideRef.current) {
                joyrideRef.current?.next();
            }
        };

        firstAddElBtn?.addEventListener('click', handleFirstAddElBtnClick);
        // fourthRegenerateBtn?.addEventListener('click', handleFourthRegenerateBtnClick);
        // fifthVariantsSelect?.addEventListener('click', handleFifthVariantsSelect);
        // sixthRefreshVariants?.addEventListener('click', handleSixthRefreshVariants);
        addLevelBtn?.addEventListener('click', handleAddLevelBtn);
        removeLevelBtn?.addEventListener('click', handleRemoveLevelBtn);
        editBtn?.addEventListener('click', handleEditBtn);
        return () => {
            firstAddElBtn?.removeEventListener('click', handleFirstAddElBtnClick);
            // fourthRegenerateBtn?.removeEventListener('click', handleFourthRegenerateBtnClick);
            // fifthVariantsSelect?.removeEventListener('click', handleFifthVariantsSelect);
            // sixthRefreshVariants?.removeEventListener('click', handleSixthRefreshVariants);
            addLevelBtn?.removeEventListener('click', handleAddLevelBtn);
            removeLevelBtn?.removeEventListener('click', handleRemoveLevelBtn);
            editBtn?.removeEventListener('click', handleEditBtn);
        };
    }, [dispatch]);


     let updatedSteps = steps.map(step => {
       if ( step.id === 'intro') {
            return {
              ...step,
              content: <IntroStep />
            };
        } else if ( step.id === 'addElement') {
            return {
              ...step,
              content: <AddElementStep />
            };
          }
        else if ( step.id === 'processAdd') {
            return {
              ...step,
              content: <AddProcessStep />
            };
          } else if(step.id === 'conclusionStep') {
            return {
                ...step,
                content: <ConclusionStep />
            }
          }

        else if(step.secondContent) {
            return {
                ...step,
                content: <CustomStep firstContent={step.content} secondContent={step.secondContent} />
            }
        }
        return step;
      });

    return (
        <div style={{ fontFamily:'cursive'}}>
            
            <ReactJoyride
                steps={updatedSteps}
                run={tourStarted}
                stepIndex={tourStepIndex}
                callback={handleJoyrideCallback}
                continuous={false}
                showSkipButton={false}
                disableOverlayClose={true}
                disableOverlay={index === steps.length - 1}
                spotlightClicks={true}
                getHelpers={handleHelpers}
                hideBackButton={true}
                styles={{
                    options: {
                        zIndex: 10000,
                    },
                }}
                tooltipComponent={(props) => <CustomTooltip {...props} joyrideRef={joyrideRef!} />}
            />
        </div>
    )
};