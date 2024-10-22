import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProjectForm from './components/ProjectForm';
import EmptyHeader from './components/EmptyHeader';

function App() {
    const [mode, setMode] = useState(null);

    const handleCreateProject = () => {
        setMode('create');
    };

    const handleCancelProject = () => {
        setMode(null);
    };
    return (
        <div className='app-container'>
            <Sidebar onCreate={handleCreateProject} />
            <main className='main-content'>
                {!mode && <EmptyHeader onCreate={handleCreateProject} />}
                {mode === 'create' && (
                    <ProjectForm onCancel={handleCancelProject} />
                )}
            </main>
        </div>
    );
}

export default App;
