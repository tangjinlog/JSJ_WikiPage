import React from 'react';

const Count = ({ children }: { children: React.ReactNode }) => {
	return <div className="text-sm text-gray-500">{children}</div>;
};

const Title = ({ children }: { children: React.ReactNode }) => {
	return <h3 className="text-lg">{children}</h3>;
};

const Content = ({ children }: { children: React.ReactNode }) => {
	return <div className="text-m whitespace-pre-wrap py-4">{children}</div>;
};

const Author = ({ children }: { children: React.ReactNode }) => {
	return <div className="text-sm text-gray-500">{children}</div>;
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
