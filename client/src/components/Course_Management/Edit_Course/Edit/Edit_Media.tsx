import { useContext } from 'react';
import { contentContext } from '../../../../context/contentContext'; 
import { Card } from 'antd';

function Edit_Media () {
    const { contentID } = useContext(contentContext);

    const information = JSON.parse(contentID);
    return (
        <div>
            <Card>
                <h1>{information.content}</h1>
            </Card>
        </div>
    )
}

export default Edit_Media;