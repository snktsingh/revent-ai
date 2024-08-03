import { Step } from 'react-joyride';

export interface CustomStep extends Step {
  id?: string;
  secondContent?: string;
}


export const steps: CustomStep[] = [
  {
    target : 'body',
    content : 'Designing Presentations does not need to be time consuming,let’s save time using Revent Press.Take this tutorial and learn how to make professional slides within seconds using Revent Press',
    title : 'Save time with Revent Press',
    disableBeacon : true,
    id:'intro',
    placement: 'center'
  },
  {
    target: '.add-slide-step',
    content: `Let's start`,  
    secondContent: `Add a new slide by clicking "New Slide"`,  
    id: 'addSlide',
    disableBeacon: true,
    styles : {
      options: {
        width:'50px',
      },
    }
  },
  {
    target: '.first-step',
    content: 'Click "Add Elements" to get list of elements',    
    id: 'addElement',
    disableBeacon: true,
    styles : {
      options: {
        width:'50px',
      },
    }
  },
  {
    target: '.second-step',
    content: 'Click on an element to add it to your Canvas Let’s add a Process slide!',
    disableBeacon: true,
    id: 'processAdd',
  },
  {
    target: '.add-level-step',
    content:'All elements are customizable to your preference',
    secondContent : 'Add or remove a box by clicking ‘+’ or ‘-’',
    disableBeacon: true,
    locale: {
      back: 'Exit',
    },
    id: 'addRemoveLevel',
  },
  {
    target: '.fourth-step',
    content: 'Click on ‘Regenerate’ to design your slide.',
    disableBeacon: true,
    locale: {
      back: 'Exit',
    },
    id: 'regenerate',
  },
  {
    target: '.fifth-step',
    content:'Countless Variants',
    secondContent : 'Hit ‘Refresh’ to explore more options.',
    disableBeacon: true,
    locale: {
      back: 'Exit',
    },
    id: 'variants',
  },
  {
    target: 'body',
    content:'Thank you for spending a few minutes learning how to use Revent Press! Let’s keep going!',
    placement: 'center',
    styles: {
      options: {
        width: 300,
        zIndex : 1201
      },
    },
    locale: {
      back: 'Exit',
      close : 'Proceed'
    },
    id: 'conclusionStep',
  },
];
