import React from 'react';
import RequestDetailList from './RequestDetailList';

const RequestTable = ({ requests, onEdit, onDelete, onView }) => {
  return (
    <RequestDetailList
      requests={requests}
      onEdit={onEdit}
      onDelete={onDelete}
      onView={onView}
    />
  );
};

export default RequestTable;