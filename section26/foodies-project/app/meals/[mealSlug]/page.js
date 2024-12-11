import Image from 'next/image';

import styles from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

const MealPage = ({ params }) => {
    const { mealSlug } = params;
    const meal = getMeal(mealSlug);

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return (
        <>
            <header className={styles.header}>
                <div className={styles.image}>
                    <Image
                        src={`https://pllanes-nextjs-demo-foodies-app.s3.us-east-1.amazonaws.com/burger.jpg/${meal.image}`}
                        fill
                    />
                </div>
                <div className={styles.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={styles.creator}>
                        by{' '}
                        <a href={`mailto:${meal.creator_email}`}>
                            {meal.creator}
                        </a>
                    </p>
                    <p className={styles.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={styles.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}
                ></p>
            </main>
        </>
    );
};

export default MealPage;
