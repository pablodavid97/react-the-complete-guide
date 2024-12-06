const MealPage = ({ params }) => {
    const { slug } = params;

    return (
        <div>
            <h1>Meal Page</h1>
            <p>Meal with id {slug}</p>
        </div>
    );
};

export default MealPage;
