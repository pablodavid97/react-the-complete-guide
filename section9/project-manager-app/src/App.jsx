import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProjectForm from './components/ProjectForm';
import EmptyHeader from './components/EmptyHeader';
import ProjectDetails from './components/ProjectDetails';

const deriveActiveProject = (projects) => {
    for (let project of projects) {
        if (project.isActive) {
            return project;
        }
    }
    return null;
};

function App() {
    const [mode, setMode] = useState(null);
    const [projects, setProjects] = useState([]);
    const activeProject = deriveActiveProject(projects);

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

    const handleProjectSelection = (selectedProject) => {
        setMode('edit');
        setProjects((prevProjects) => {
            const newProjects = prevProjects.map((project) => {
                if (project.id === selectedProject.id) {
                    return {
                        ...project,
                        isActive: true,
                    };
                }

                return {
                    ...project,
                    isActive: false,
                };
            });
            return newProjects;
        });
    };

    const handleProjectDeletion = () => {
        setProjects((prev) =>
            prev.filter((project) => project.id !== activeProject.id)
        );
        setMode(null);
    };

    const handleAddTask = (task) => {
        setProjects((prev) => {
            const newProjects = prev.map((project) => {
                if (project.id === task.projectId) {
                    const newTasks = [...project.tasks];
                    newTasks.push(task);

                    const newProject = {
                        ...project,
                        tasks: newTasks,
                    };
                    return newProject;
                }

                return project;
            });
            return newProjects;
        });
    };

    const handleClearTask = (clearedTask) => {
        setProjects((prev) => {
            const newProjects = prev.map((project) => {
                if (project.id === clearedTask.projectId) {
                    const newTasks = project.tasks.map((task) => {
                        if (task.id === clearedTask.id) {
                            return {
                                ...task,
                                isActive: false,
                            };
                        }
                        return task;
                    });

                    const newProject = {
                        ...project,
                        tasks: newTasks,
                    };
                    return newProject;
                }

                return project;
            });
            return newProjects;
        });
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
                        projects={projects}
                    />
                )}
                {mode === 'edit' && (
                    <ProjectDetails
                        project={activeProject}
                        onClearTask={handleClearTask}
                        onAddTask={handleAddTask}
                        onDelete={handleProjectDeletion}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
