import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProjectForm from './components/ProjectForm';
import EmptyHeader from './components/EmptyHeader';

function App() {
    const [mode, setMode] = useState(null);
    const [projects, setProjects] = useState([]);

    console.log('projects: ', projects);

    const handleCreateProject = () => {
        setMode('create');
    };

    const handleCancelProject = () => {
        setMode(null);
    };

    const handleSaveProject = (project) => {
        setProjects((prevProjects) => [project, ...prevProjects]);
        setMode(null);
    };

    return (
        <div className='app-container'>
            <Sidebar onCreate={handleCreateProject} projects={projects} />
            <main className='main-content'>
                {!mode && <EmptyHeader onCreate={handleCreateProject} />}
                {mode === 'create' && (
                    <ProjectForm
                        onCancel={handleCancelProject}
                        onSave={handleSaveProject}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
