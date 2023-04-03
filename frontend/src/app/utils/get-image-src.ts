import { environment } from '../../environments/environment';

export const getImgSrc = (filePath: string): string => {
  return environment.baseImgSrc + filePath + '/get-image';
};
