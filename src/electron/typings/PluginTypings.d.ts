type settingBase = { id: string; text: string };

type settingText = settingBase & { type: 'text' };
type settingButton = settingBase & { type: 'button' };
type settingTitle = settingBase & { type: 'title'; title: string; value: boolean };
type settingDescription = settingBase & { type: 'description'; text: string }; // actual is type: 'description'; description: string
type settingToggle = settingBase & { type: 'toggle'; value: boolean };
type settingSlider = settingBase & { type: 'slider'; value: number; min: number; max: number };
type settingRadio = settingBase & { type: 'radio'; value: string; options: string[] };

type settingGroup = settingText | settingButton | settingTitle | settingDescription | settingToggle | settingSlider | settingRadio;

declare type Setting = settingGroup[];

export default settingGroup;
