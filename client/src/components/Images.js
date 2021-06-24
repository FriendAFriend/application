import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Images = ({images, removeImage}) => 
<div>
  {images.map((image, i) =>
    <div key={i} className='fadein'>
      <div 
        onClick={() => removeImage(image.public_id)} 
        className='delete'
      >
        <FontAwesomeIcon icon={faTimesCircle} size='2x' />
      </div>
      <img src={image.secure_url} alt='' style={{width: '10rem', height: '5rem', objectFit: 'contain', overflow: 'hidden'}} />
    </div>
  )}
</div>
  ;

export default Images;