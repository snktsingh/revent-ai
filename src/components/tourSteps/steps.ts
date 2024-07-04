import { Step } from 'react-joyride';

export interface CustomStep extends Step {
  id?: string;
  secondContent?: string;
}


export const steps: CustomStep[] = [
  {
    target : 'body',
    content : 'Designing Presentations does not need to be time consuming,let’s save time using Revent Press.Take this tutorial and learn how to make professional slides within seconds using Revent Press',
    title : 'Experience Revent.ai',
    disableBeacon : true,
    id:'intro',
    placement: 'center'
  },
  {
    target: '.first-step',
    content: 'Let’s start by clicking on ‘Add Elements’',
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
    content:'Elements are customizable!',
    secondContent : 'Add or Remove Levels by clicking ‘+’ or ‘-’',
    disableBeacon: true,
    locale: {
      back: 'Exit',
    },
    id: 'addRemoveLevel',
  },
  {
    target: '.fourth-step',
    content: 'Let Revent Press help you out!',
    secondContent : 'Click ‘Regenerate’ to automate the slide design',
    disableBeacon: true,
    locale: {
      back: 'Exit',
    },
    id: 'regenerate',
  },
  {
    target: '.fifth-step',
    content:'Choose from countless variants!',
    secondContent : 'Hit ‘Refresh’ to browse through more options',
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
      },
    },
    locale: {
      back: 'Exit',
    },
    id: 'conclusionStep',
  },
];
