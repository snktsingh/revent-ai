import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  CardContainer,
  CardLink,
  CardTitle,
  MainContainer,
  PreviewCard,
  Subtitle,
  Title,
} from './style';
import slideData from './data.json';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Create a Presentation</Title>
        <TextField
          id="outlined-basic"
          label="Search presentation"
          variant="outlined"
        />
      </span>
      <br />
      <CardContainer>
        {slideData.templates.map((slide, index) => {
          return (
            <CardTitle onClick={() => navigate('/themes')}>
              <CardLink>
                <PreviewCard />
                {slide.title}
              </CardLink>
            </CardTitle>
          );
        })}
      </CardContainer>
      {/* <Accordion aria-controls="panel1a-content" id="panel1a-header">
        <AccordionSummary>
          <Subtitle>More Templates</Subtitle>
        </AccordionSummary>
        <AccordionDetails>
          <CardContainer>
            {slideData.templates.map((slide, index) => {
              return (
                <CardTitle>
                  <CardLink href={slide.link}>
                    <PreviewCard />
                    {slide.title}
                  </CardLink>
                </CardTitle>
              );
            })}
          </CardContainer>
        </AccordionDetails>
      </Accordion> */}
      <Title>Recent Presentation</Title>
      No Recent Presentations
      {/* <CardContainer>
        {slideData.recent.map((slide, index) => {
          return (
            <CardTitle>
              <CardLink href={slide.link}>
                <PreviewCard />
                {slide.title}
              </CardLink>
            </CardTitle>
          );
        })}
      </CardContainer> */}
    </MainContainer>
  );
};
export default Dashboard;
