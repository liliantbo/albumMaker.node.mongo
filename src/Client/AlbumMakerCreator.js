import React from 'react';

import AlbumFooter from '../commonComponents/AlbumFooter';
import AlbumBody from '../AlbumBody/BodyOptions';
import BodyMain from '../AlbumBody/BodyMain';

export default function AlbumMakerCreator() {
 
  return (
    <div className='w-100'>
      <div className="d-flex flex-row " style={{ height: '83vh' }}>
        <AlbumBody>
          <BodyMain />
        </AlbumBody>
      </div>
      <AlbumFooter />
    </div >
  );
}
