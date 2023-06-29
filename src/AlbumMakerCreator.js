import React from 'react';

import AlbumFooter from './AlbumFooter';
import AlbumBody from './AlbumBody/BodyOptions';
import BodyMain from './AlbumBody/BodyMain';

export default function AlbumMakerCreator() {
 
  return (
    <div>
      <div className="d-flex flex-row " style={{ height: '83vh' }}>
        <AlbumBody>
          <BodyMain />
        </AlbumBody>
      </div>
      <AlbumFooter />
    </div >
  );
}
