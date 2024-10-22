import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProjectForm from './components/ProjectForm';
import EmptyHeader from './components/EmptyHeader';
import ProjectDetails from './components/ProjectDetails';

function App() {
    const [mode, setMode] = useState(null);
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState(null);

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

    const handleProjectSelection = (project) => {
        setMode('edit');
        setActiveProject(project);
    };

    const handleProjectDeletion = () => {
        setProjects((prev) =>
            prev.filter((project) => project.title !== activeProject.title)
        );
        setActiveProject(null);
        setMode(null);
    };

    return (
        <div className='app-container'>
            <Sidebar
                onCreate={handleCreateProject}
                projects={projects}
                onSelectProject={handleProjectSelection}
            />
            <main className='main-content'>
                {!mode && <EmptyHeader onCreate={handleCreateProject} />}
                {mode === 'create' && (
                    <ProjectForm
                        onCancel={handleCancelProject}
                        onSave={handleSaveProject}
                    />
                )}
                {mode === 'edit' && (
                    <ProjectDetails
                        project={activeProject}
                        onDelete={handleProjectDeletion}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
