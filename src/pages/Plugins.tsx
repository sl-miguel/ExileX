import Accordion from '../components/accordion/Accordion';
import AccordionBody from '../components/accordion/AccordionBody';
import AccordionHeader from '../components/accordion/AccordionHeader';

function Plugins() {
	return (
		<div>
			<Accordion open={true}>
				<AccordionHeader>
					<h1>Title 1</h1>
				</AccordionHeader>
				<AccordionBody>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatum ab facere laudantium tenetur eligendi magnam ipsam? Reiciendis, ad
						quisquam esse facere ipsa, eveniet distinctio adipisci quam laudantium reprehenderit qui!
					</p>
				</AccordionBody>
			</Accordion>
			<Accordion>
				<AccordionHeader>
					<h1>Title 2</h1>
				</AccordionHeader>
				<AccordionBody>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
				</AccordionBody>
			</Accordion>
		</div>
	);
}

export default Plugins;
