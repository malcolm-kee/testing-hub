import React from 'react';
import styled, { keyframes } from 'styled-components';

const bouncedelay = keyframes`
	0%, 80%, 100% { 
	    transform: scale(0);
  	} 
  	40% { 
	    transform: scale(1.0);
	}
`;

const Dot = styled.div`
	width: 18px;
	height: 18px;
	background-color: #c0c0c0;
	border-radius: 100%;
	display: inline-block;
	animation: ${bouncedelay} 1.4s infinite ease-in-out both;
	animation-delay: ${props => props.delay};
`;

const Div = styled.div`
	text-align: center;
	width: 70px;
	margin: 5px auto;
`;

const DotsLoader = () => (
	<Div>
		<Dot delay="-0.32s" />
		<Dot delay="-0.16s" />
		<Dot delay="0s" />
	</Div>
);

export default DotsLoader;
