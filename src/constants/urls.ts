import { BASE_PATH } from 'constants/common';

export const getBasePath = () => `${BASE_PATH}`;

export const getUploadPath = () => `${getBasePath()}upload`;

export const getDownloadPath = () => `${getBasePath()}download`;

export const getSettingsPath = () => `${getBasePath()}settings`;
