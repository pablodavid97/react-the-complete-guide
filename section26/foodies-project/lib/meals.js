import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3();

const db = sql('meals.db');

export const getMeals = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // throw new Error('Loading meals failed!');

    return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = (slug) => {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
};

export const saveMeal = async (meal) => {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const bufferedImage = await meal.image.arrayBuffer();

    s3.putObject({
        Bucket: 'pllanes-nextjs-demo-foodies-app',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });

    meal.image = fileName;

    db.prepare(
        `
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES  (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image, 
            @slug
        )
    `
    ).run(meal);
};
