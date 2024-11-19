import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'posts',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<p>Loading...</p>}>
                                <BlogPage />
                            </Suspense>
                        ),
                        loader: async () => {
                            const module = await import('./pages/Blog');
                            return module.loader();
                        },
                    },
                    {
                        path: ':id',
                        element: (
                            <Suspense fallback={<p>Loading...</p>}>
                                <PostPage />
                            </Suspense>
                        ),
                        loader: async ({ params }) => {
                            const module = await import('./pages/Post');
                            return module.loader({ params });
                        },
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
