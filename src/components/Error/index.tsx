import React, { Component, ReactNode } from 'react';
import { ErrorContainer, ErrorMessage, HomeButton, StyledContainer } from './style';
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { ErrorCloud } from '@/constants/media';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <StyledContainer>
                    <ErrorContainer>
                        <ErrorMessage>
                            <img src={ErrorCloud} alt="error" />
                            <Typography variant="h3" color={"#004fba"}>
                                Something went wrong.
                            </Typography>
                            <Typography variant="body1">
                                We are working to fix the problem. Please try again later.
                            </Typography>
                        </ErrorMessage>
                        <HomeButton
                            variant="contained"
                            sx={{ background:'#004fba'}}
                            startIcon={<HomeIcon />}
                            onClick={() => window.location.href = '/'}
                        >
                            Go to Home Page
                        </HomeButton>
                    </ErrorContainer>
                </StyledContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
