import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';

import Switch from '../components/generics/Switch';
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

  // const updateSettings = (name: string) => {};

  useEffect(() => {
    const handlePlugins = (_: any, plugins: any) => {
      console.log('Got plugins settings', plugins);
      setPlugins(plugins);
    };

    ipcRenderer.send('plugins-mounted');
    ipcRenderer.on('plugins', handlePlugins);

    return () => {
      ipcRenderer.removeListener('plugins', handlePlugins);
    };
  }, []);

  return (
    <div>
      {plugins.map((plugin: any) => (
        <Accordion key={plugin.id}>
          <AccordionHeader>
            <h1>{plugin.name}</h1>
          </AccordionHeader>
          <AccordionBody>
            {plugin.settings.map((setting: any, index: number) => (
              <div key={`${plugin.id}-${index}`}>
                {setting.type === 'description' && <p>{setting.description}</p>}
                {setting.type === 'toggle' && <Toggle text={setting.text} value={setting.value} />}
                {setting.type === 'slider' && <Slider defaultValue={1} />}
                {setting.type === 'radio' && <Radio id={setting.id} options={setting.options} defaultValue={setting.value} />}
                {setting.type === 'text' && <Text text={setting.text} />}
                {setting.type === 'button' && <Button text={setting.text} />}
              </div>
            ))}
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}

export default Plugins;
