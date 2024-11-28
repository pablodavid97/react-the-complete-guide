import Modal from '../components/Modal';
import { Link, Form, redirect } from 'react-router-dom';
import styles from './NewPost.module.css';

function NewPost() {
    return (
        <Modal>
            <Form method='post' className={styles.form}>
                <div className={styles.control}>
                    <label htmlFor='body'>Text</label>
                    <textarea id='body' name='body' required rows={3} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='name'>Your name</label>
                    <input type='text' name='author' id='name' required />
                </div>
                <div className={styles.actions}>
                    <Link to='..'>Cancel</Link>
                    <button>Submit</button>
                </div>
            </Form>
        </Modal>
    );
}

export default NewPost;

export const action = async ({ request }) => {
    const formData = await request.formData();

    const postData = Object.fromEntries(formData);

    const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log('response: ', response);

    return redirect('/');
};
