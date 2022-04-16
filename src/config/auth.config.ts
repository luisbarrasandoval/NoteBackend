export interface SettingAUTH {
  expiresIn: number; // in seconds
  doubleCheckExpire: number; // minutes
}

const settings: SettingAUTH = {
  expiresIn: 60 * 60 * 24 * 7,
  doubleCheckExpire: 30,
};

export default settings;