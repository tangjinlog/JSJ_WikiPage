import React from 'react';

const Title = ({ children }: { children: React.ReactNode }) => {
	return <h3>{children}</h3>;
};

const Content = ({ children }: { children: React.ReactNode }) => {
	return <div>{children}</div>;
};

const Author = ({ children }: { children: React.ReactNode }) => {
	return <div>{children}</div>;
};
function WikiItemMain({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}

const WikiItem = Object.assign(WikiItemMain, {
	Title,
	Content,
	Author,
});

export default WikiItem;
