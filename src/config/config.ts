const { VITE_API_URL, VITE_AUTH_CODE_LENGTH } = import.meta.env;

type ConfigType = {
  apiUrl: string;
  authCodeLength: number
}

const config: ConfigType = {
  apiUrl: VITE_API_URL,
  authCodeLength: Number(VITE_AUTH_CODE_LENGTH),
};

export default config;
