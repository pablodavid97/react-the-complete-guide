import { useState } from 'react';
import styles from './NewPost.module.css';

function NewPost({ onAddPost, onCancel }) {
    const [body, setBody] = useState();
    const [author, setAuthor] = useState();

    const handleChangeBody = (event) => {
        const { value } = event.target;
        setBody(value);
    };

    const handleChangeAuthor = (event) => {
        const { value } = event.target;
        setAuthor(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('submitting...');

        const postData = {
            body,
            author,
        };

        console.log('post data: ', postData);
        onAddPost(postData);
        onCancel();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div>
                <label htmlFor='body'>Text</label>
                <textarea
                    id='body'
                    required
                    rows={3}
                    onChange={handleChangeBody}
                />
            </div>
            <div>
                <label htmlFor='name'>Your name</label>
                <input
                    type='text'
                    id='name'
                    required
                    onChange={handleChangeAuthor}
                />
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={onCancel}>
                    Cancel
                </button>
                <button>Submit</button>
            </div>
        </form>
    );
}

export default NewPost;
