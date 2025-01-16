import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Construction3D = React.lazy(() => import('packages/components/3D/Construction3D'));

const NotFound = React.lazy(() => import('packages/pages/404'));

const Work = () => {
  return (
    <Routes>
      <Route path="/" element={<Construction3D />} />
      <Route path="/agi" element={<Construction3D />} />
      <Route path="/quest-analytics" element={<Construction3D />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Work;
