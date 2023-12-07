import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';

import Toggle from '../components/settings/Toggle';
import Slider from '../components/settings/Slider';
import Radio from '../components/settings/Radio';
import Text from '../components/settings/Text';
import Button from '../components/settings/Button';
import Accordion from '../components/accordion/Accordion';
import AccordionBody from '../components/accordion/AccordionBody';
import AccordionHeader from '../components/accordion/AccordionHeader';

function Plugins() {
  const [plugins, setPlugins] = useState([]);

  const handleSettings = (plugin: any, setting: any) => {
    console.log('Settings:', plugin, setting);
    ipcRenderer.send('settings[update]', { plugin, setting });
  };

  const handlePlugins = (plugin: any) => {
    console.log('plugins:', plugin);
    ipcRenderer.send('plugins[update]', { plugin });
  };

  const handlePress = (plugin: any, setting: any) => {
    console.log('Pressed', plugin, setting);
    ipcRenderer.send('handle[button]', { plugin, setting });
  };

  useEffect(() => {
    const updatePlugins = (_: any, plugins: any) => {
      console.log('Got plugins settings', plugins);
      setPlugins(plugins);
    };

    ipcRenderer.send('plugins[request]');
    ipcRenderer.on('plugins[response]', updatePlugins);

    return () => {
      ipcRenderer.removeListener('plugins[response]', updatePlugins);
    };
  }, []);

  return (
    <div>
      {plugins.map((plugin: any) => (
        <Accordion key={plugin.id} open={plugin.active}>
          <AccordionHeader plugin={plugin} toParent={handlePlugins}>
            <h1>{plugin.name}</h1>
          </AccordionHeader>
          <AccordionBody>
            <p className="py-2 text-gray">{plugin.description}</p>
            {plugin.settings.map((setting: any, index: number) => (
              <div key={`${plugin.id}-${index}`}>
                {setting.type === 'toggle' && <Toggle plugin={plugin} setting={setting} toParent={handleSettings} />}
                {setting.type === 'slider' && <Slider plugin={plugin} setting={setting} toParent={handleSettings} />}
                {setting.type === 'radio' && <Radio plugin={plugin} setting={setting} toParent={handleSettings} />}
                {setting.type === 'text' && <Text plugin={plugin} setting={setting} toParent={handleSettings} />}
                {setting.type === 'button' && <Button plugin={plugin} setting={setting} toParent={handlePress} />}
              </div>
            ))}
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}

export default Plugins;
