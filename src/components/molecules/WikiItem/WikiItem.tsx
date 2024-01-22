import React from 'react';

const Count = ({ children }: { children: React.ReactNode }) => {
	return <div>{children}</div>;
};

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
	Count,
	Title,
	Content,
	Author,
});

export default WikiItem;
