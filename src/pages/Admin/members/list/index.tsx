import DetailedInformation from './DetailedInformation';
import CreateButton from './CreateButton';

const index = () => {
    return (
        <>
            <div className="mb-4">
                <CreateButton />
            </div>
            <DetailedInformation />
        </>
    );
};

export default index;
