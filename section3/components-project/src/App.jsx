import { useState } from 'react';
import { Header } from './components/Header/Header';
import { CoreConcept } from './components/CoreConcept';
import { TabButton } from './components/TabButton';
import componentsImg from './assets/components.png';
import { CORE_CONCEPTS } from './data';
import { EXAMPLES } from './data';

function App() {
    const [tabContent, setTabContent] = useState();

    function handleSelect(selectedButton) {
        setTabContent(selectedButton);
        console.log('tab content: ', tabContent);
    }
    return (
        <div>
            <Header />
            <main>
                <section id='core-concepts'>
                    <h2>Core Concepts</h2>
                    <ul>
                        {CORE_CONCEPTS.map((concept, index) => (
                            <CoreConcept
                                key={`concept-${index}`}
                                {...concept}
                            />
                        ))}
                    </ul>
                </section>
                <section id='examples'>
                    <h2>Examples</h2>
                    <menu>
                        <TabButton
                            onSelect={() => handleSelect('components')}
                            isSelected={tabContent === 'components'}
                        >
                            Components
                        </TabButton>
                        <TabButton
                            onSelect={() => handleSelect('jsx')}
                            isSelected={tabContent === 'jsx'}
                        >
                            JSX
                        </TabButton>
                        <TabButton
                            onSelect={() => handleSelect('props')}
                            isSelected={tabContent === 'props'}
                        >
                            Props
                        </TabButton>
                        <TabButton
                            onSelect={() => handleSelect('state')}
                            isSelected={tabContent === 'state'}
                        >
                            State
                        </TabButton>
                    </menu>
                    {tabContent ? (
                        <div id='tab-content'>
                            <h3>{EXAMPLES[tabContent].title}</h3>
                            <p>{EXAMPLES[tabContent].description}</p>
                            <pre>
                                <code>{EXAMPLES[tabContent].code}</code>
                            </pre>
                        </div>
                    ) : (
                        <p>Please select a topic.</p>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
