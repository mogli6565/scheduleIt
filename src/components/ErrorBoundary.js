import React from 'react';
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  margin: 100px auto;
  flex-direction: column;
  box-shadow: 1px 1px 5px gainsboro;
  background: rgba(255, 255, 255, 0.9);
  color: rgba(231, 0, 0, 0.9);
  width: 50%;
  border-radius: 6px;
  padding: 0px 20px 20px 20px;
`;

// global error boundary to catch all of the errors
export default class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render(){
        if (this.state.errorInfo) {
            return (
                <Root>
                    <h3>Oops.. Something went wrong ;(</h3>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </Root>
            );
        }
        // Normally, just render the children
        return this.props.children;
    }
};