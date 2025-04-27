const { VITE_API_URL, VITE_AUTH_CODE_LENGTH, VITE_CLOUDINARY_URI } = import.meta
  .env;

type ConfigType = {
  apiUrl: string;
  authCodeLength: number;
  cloudinary: string;
};

const config: ConfigType = {
  apiUrl: VITE_API_URL,
  authCodeLength: Number(VITE_AUTH_CODE_LENGTH),
  cloudinary: VITE_CLOUDINARY_URI,
};

export default config;
