import NavBar from '@/common-ui/NavBar';
import React, { useState } from 'react'
import { FlexContainer, LeftContainer, RightContainer, StyledTab, StyledTabs, TutorialContainer, TutorialHeading, VideoContainer, VideoTitle } from './style';
import tutorials from "../../data/tutorials.json";

interface Tutorial {
    title: string;
    id: number;
    embedLink: string;
}

const Tutorials = () => {

    const [tab, setTab] = useState<number>(1);

    return (
        <>
            <NavBar />
            <TutorialContainer>
                <TutorialHeading>Tutorials</TutorialHeading>
                <FlexContainer>
                    <LeftContainer>
                        <StyledTabs>
                            {tutorials.map((tutorial: Tutorial, index) => (
                                <StyledTab key={tutorial.id} isActive={tutorial.id === tab} onClick={() => setTab(tutorial.id)}>
                                    {tutorial.title}
                                </StyledTab>
                            ))}
                        </StyledTabs>
                    </LeftContainer>
                    <RightContainer>
                        {tutorials.map(
                            (tutorial: Tutorial, index) =>
                                tutorial.id === tab && (
                                    <VideoContainer key={tutorial.id}>
                                    <VideoTitle>{tutorial.title}</VideoTitle>
                                    <iframe
                                        width="90%"
                                        height="100%"
                                        src={tutorial.embedLink}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                    </VideoContainer>
                                )
                        )}

                    </RightContainer>
                </FlexContainer>
            </TutorialContainer>
        </>
    )
}

export default Tutorials;
