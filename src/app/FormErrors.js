import React from 'react';
export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}><strong>{formErrors[fieldName]}</strong></p>
        )
      } else {
        return '';
      }
    })}
  </div>
module.exports = FormErrors;
