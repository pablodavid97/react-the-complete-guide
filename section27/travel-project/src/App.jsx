import Accordion from './components/Accordion/Accordion';
import Place from './components/Place';
import SearchableList from './components/SearchableList/SearchableList';

import { PLACES } from './util/places';

function App() {
    return (
        <>
            <header className='header'>
                <h1>Travel Agency Project</h1>
            </header>
            <main>
                <section>
                    <h2>Why work with us?</h2>
                    <Accordion className='accordion'>
                        <Accordion.Item
                            id='experience'
                            className='accordion-item'
                        >
                            <Accordion.Title className='accordion-item-title'>
                                We got 20 years of experience
                            </Accordion.Title>
                            <Accordion.Content className='accordion-item-content'>
                                <article>
                                    <p>You can&apos;t go wrong with us.</p>
                                    <p>
                                        We are in the business of planning
                                        highly individualized vaction trips for
                                        more that 20 years.
                                    </p>
                                </article>
                            </Accordion.Content>
                        </Accordion.Item>
                        <Accordion.Item
                            id='local-guides'
                            className='accordion-item'
                        >
                            <Accordion.Title className='accordion-item-title'>
                                We're working with local guides
                            </Accordion.Title>
                            <Accordion.Content className='accordion-item-content'>
                                <article>
                                    <p>
                                        We are not doing this along from our
                                        office.
                                    </p>
                                    <p>
                                        Instead, we are working with local
                                        guides to ensure a safe and pleasant
                                        vacation.
                                    </p>
                                </article>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </section>
                <section>
                    <SearchableList
                        items={PLACES}
                        itemKeyFn={(item) => item.id}
                    >
                        {(item) => {
                            return <Place item={item} />;
                        }}
                    </SearchableList>
                    <SearchableList
                        items={['item 1', 'item 2']}
                        itemKeyFn={(item) => item}
                    >
                        {(item) => {
                            return item;
                        }}
                    </SearchableList>
                </section>
            </main>
        </>
    );
}

export default App;
