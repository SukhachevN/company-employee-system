import { FaEdit, FaUserPlus, FaTrash } from 'react-icons/fa';
import { ButtonTypes } from '../../../utils/interfaces';
import React from 'react';

export const iconByKey: Record<ButtonTypes, React.ReactNode> = {
  EDIT: <FaEdit />,
  REMOVE: <FaTrash />,
  ADD_EMPLOYEE: <FaUserPlus />,
};
