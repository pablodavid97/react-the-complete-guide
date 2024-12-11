'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

import styles from './image-picker.module.css';

const ImagePicker = ({ label, name }) => {
    const [pickedImage, setPickedImage] = useState();
    const imageInputRef = useRef();

    const handleImagePickerClick = () => {
        imageInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    return (
        <div className={styles.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt='The image selected by user.'
                            fill
                        />
                    )}
                </div>
                <input
                    className={styles.input}
                    type='file'
                    id={name}
                    accept='image/png, image/jpeg'
                    name={name}
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    required
                />
                <button
                    className={styles.button}
                    type='button'
                    onClick={handleImagePickerClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
};

export default ImagePicker;
