import { useRouter } from 'next/router';

const DetailsPage = () => {
    const router = useRouter();

    console.log('id: ', router.query.ID);

    const { ID } = router.query;

    return <h1>News Details Page: {ID}</h1>;
};

export default DetailsPage;
