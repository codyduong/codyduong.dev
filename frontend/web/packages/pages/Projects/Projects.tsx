import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Construction3D = React.lazy(() => import('packages/components/3D/Construction3D'));

const NotFound = React.lazy(() => import('packages/pages/404'));

const Mapsy = React.lazy(() => import('./mapsy'));

const Projects = () => {
  return (
    <Routes>
      <Route path="/" element={<Construction3D />} />
      <Route path="/hitokage" element={<Construction3D />} />
      <Route path="/mapsy" element={<Mapsy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Projects;
