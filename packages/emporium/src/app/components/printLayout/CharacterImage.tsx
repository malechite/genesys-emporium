import * as images from '@emporium/images';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';

interface CharacterImageProps {}

export const CharacterImage = () => {
    const description = useSelector((state: any) => state.description);
    const theme = useSelector((state: any) => state.theme);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleError = () => {
        if (imgRef.current) {
            imgRef.current.src = images.user;
        }
    };

    return (
        <div>
            <Row className="justify-content-end">
                <div className={`header header-${theme}`}>
                    CHARACTER IMAGE
                </div>
            </Row>
            <hr />
            <img
                className="characterImage m-1 w-100 h-100"
                src={description.image ? description.image : ''}
                alt="not found"
                ref={imgRef}
                onError={handleError}
            />
        </div>
    );
};
