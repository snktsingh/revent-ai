import {
  CardHeading,
  CardTextColor,
  FlipCard,
  FlipCardBack,
  FlipCardFront,
  FlipCardInner,
} from './style';
import '../../styles/base/base.css';
import { GridRowCenter, PrimaryText } from '@/styles/common-styles/style';
import { GridContainer } from '../header/style';
import {
  DesktopContainer,
  LightHeading,
  MobileContainer,
} from '@/pages/homepage/style';
const CustomCard = () => {
  return (
    <>
      <DesktopContainer>
        <GridContainer container>
          <GridRowCenter xs={6}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <CardHeading>Presentation</CardHeading>
                  <LightHeading>
                    <CardTextColor>Automation</CardTextColor>
                  </LightHeading>
                </div>
                <div className="flip-card-back">
                  <p>
                    Deliver customized presentations on-the-go with{' '}
                    <CardTextColor>Revent Press</CardTextColor>, our flagship
                    Presentation Automation software.
                  </p>
                </div>
              </div>
            </div>
          </GridRowCenter>
          <GridRowCenter xs={6}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <CardHeading>Presentation</CardHeading>
                  <LightHeading>
                    <CardTextColor>Design</CardTextColor>
                  </LightHeading>
                </div>
                <div className="flip-card-back">
                  <p>
                    Employ the premium services of our experts to{' '}
                    <CardTextColor>
                      craft the perfect presentations
                    </CardTextColor>
                    tailored to your requirements.
                  </p>
                </div>
              </div>
            </div>
          </GridRowCenter>
        </GridContainer>
      </DesktopContainer>
      <MobileContainer>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <CardHeading>Presentation</CardHeading>
              <LightHeading>
                <CardTextColor>Automation</CardTextColor>
              </LightHeading>
            </div>
            <div className="flip-card-back">
              <p>
                Deliver customized presentations on-the-go with{' '}
                <CardTextColor>Revent Press</CardTextColor>, our flagship
                Presentation Automation software.
              </p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <CardHeading>Presentation</CardHeading>
              <LightHeading>
                <CardTextColor>Design</CardTextColor>
              </LightHeading>
            </div>
            <div className="flip-card-back">
              <p>
                Employ the premium services of our experts to{' '}
                <CardTextColor>craft the perfect presentations</CardTextColor>{' '}
                tailored to your requirements.
              </p>
            </div>
          </div>
        </div>
      </MobileContainer>
    </>
  );
};
export default CustomCard;
