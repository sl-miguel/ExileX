import { useState, cloneElement } from 'react';
import { AccordionProps } from './interfaces';
// import AccordionBody from './AccordionBody';

function Accordion({ children, open = false }: AccordionProps) {
	const [isOpen, setIsOpen] = useState(open);
	const [header, body] = children;

	const handleHeaderClick = () => setIsOpen(!isOpen);

	return (
		<div className='border-b-[0.5px] border-solid border-gray'>
			{cloneElement(header, { onClick: handleHeaderClick, expanded: isOpen })}
			{cloneElement(body, { expanded: isOpen })}
			{/* {isOpen && body} */}
			{/* <AccordionBody expanded={isOpen}>{body}</AccordionBody> */}
		</div>
	);
}

export default Accordion;
