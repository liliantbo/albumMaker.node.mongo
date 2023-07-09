import React from 'react';

import AlbumBody from '../AlbumBody/BodyOptions';
import BodyMain from '../AlbumBody/BodyMain';

export default function AlbumMakerCreator() {

  return (
    <div className="d-flex flex-row "  style={{ height: '81vh' }}>
      <AlbumBody>
        <BodyMain />
      </AlbumBody>
    </div>
  );
}
