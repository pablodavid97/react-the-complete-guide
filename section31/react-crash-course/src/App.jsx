import { useState } from 'react';

import Header from './components/Header';
import Posts from './components/Posts';

const POSTS = [
    { title: 'test 1', description: 'test 1' },
    { title: 'test 2', description: 'test 2' },
];

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowModel = () => {
        setIsModalOpen(true);
    };

    const handleHideModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Header onCreatePost={handleShowModel} />
            <main>
                <Posts
                    posts={POSTS}
                    isPosting={isModalOpen}
                    onStopPosting={handleHideModal}
                />
            </main>
        </>
    );
}

export default App;
