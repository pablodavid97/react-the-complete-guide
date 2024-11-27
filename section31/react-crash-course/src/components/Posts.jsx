import { useState } from 'react';

import Post from './Post';
import NewPost from './/NewPost';
import Modal from './Modal';

import styles from './Posts.module.css';

const Posts = ({ isPosting, onStopPosting }) => {
    const [posts, setPosts] = useState([]);

    const handleCreatePost = (newPost) => {
        setPosts((prev) => [...prev, newPost]);
    };

    return (
        <>
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewPost
                        onCancel={onStopPosting}
                        onAddPost={handleCreatePost}
                    />
                </Modal>
            )}
            {posts.length > 0 && (
                <ul className={styles.posts}>
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            author={post.author}
                            body={post.body}
                        />
                    ))}
                </ul>
            )}
            {posts.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>There are no posts yet.</h2>
                    <p>Start adding some!</p>
                </div>
            )}
        </>
    );
};

export default Posts;
