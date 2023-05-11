import path from 'path';

export const getProjectPath = () => {
  return path.join(__dirname, '..', '..');
};
