const { VITE_API_URL, VITE_AUTH_CODE_LENGTH, VITE_CLOUDINARY_URI, MQTT_URL } = import.meta
  .env;

type ConfigType = {
  apiUrl: string;
  authCodeLength: number;
  cloudinary: string;
  mqtt: string
};

const config: ConfigType = {
  apiUrl: VITE_API_URL,
  authCodeLength: Number(VITE_AUTH_CODE_LENGTH),
  cloudinary: VITE_CLOUDINARY_URI,
  mqtt: MQTT_URL
};

export default config;
