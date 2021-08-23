import React from 'react';
import QRImage from 'react-qr-image';

export default function App(props) {
  const { text, ...other } = props
  return (
    <>
      <QRImage text={text} color="#3a66c8" background="white" size={3} margin={2}/>
    </>
  );
}