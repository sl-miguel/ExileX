import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';

import Switch from '../components/generics/Switch';
import Toggle from '../components/settings/Toggle';
import Slider from '../components/settings/Slider';
import Radio from '../components/settings/Radio';
import Text from '../components/settings/Text';
import Button from '../components/settings/Button';

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
        <div key={plugin.id}>
          <div>
            <div className="flex h-12 cursor-pointer items-center font-medium">
              <div className="flex items-center gap-2">
                <Switch />
                <h3>{plugin.name}</h3>
              </div>
            </div>
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
          </div>
        </div>
      ))}
    </div>

    // {plugins.map((plugin, index) => (
    // <div key={index}>
    //   {script.settings.map((s, sIndex) => (
    //     <div key={sIndex}>
    //       {s.title && <div className="settings-title">{s.title}</div>}
    //       {s.desc && <div className="settings-desc">{s.desc}</div>}
    //       {s.group && (
    //         <div className="settings-content">
    //           {s.group.map((e, eIndex) => (
    //             <div key={eIndex} className="setting">
    //               {e.text && e.type !== 'radio' && <div className="setting-text">{e.text}</div>}
    //               <div className="setting-value">
    //                 {e.type === 'toggle' && (
    //                   <input
    //                     type="checkbox"
    //                     className={e.style === 2 ? 'switch-style-alt' : ''}
    //                     checked={e.value}
    //                     onChange={() => updateSettings(script, s, e)}
    //                   />
    //                 )}
    //                 {e.type === 'key' && (
    //                   <select
    //                     value={e.value}
    //                     onChange={(event) => updateSettings(script, s, e, event.target.value)}
    //                   >
    //                     {vKeys.map((key, keyIndex) => (
    //                       <option key={keyIndex} value={key[2]}>
    //                         {key[2]}
    //                       </option>
    //                     ))}
    //                   </select>
    //                 )}
    //                 {e.type === 'radio' && (
    //                   <div style={{ paddingBottom: '3px' }}>
    //                     {e.text}
    //                     {e.options.map((option, optionIndex) => (
    //                       <label key={optionIndex}>
    //                         <input
    //                           type="radio"
    //                           value={option}
    //                           checked={e.value === option}
    //                           onChange={() => updateSettings(script, s, e, option)}
    //                         />
    //                         {option}
    //                       </label>
    //                     ))}
    //                   </div>
    //                 )}
    //                 {e.type === 'slider' && (
    //                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    //                     <span>{e.value}</span>
    //                     <input
    //                       type="range"
    //                       className={e.size === 1 ? 'small' : e.size === 2 ? 'medium' : ''}
    //                       value={e.value}
    //                       min={e.min}
    //                       max={e.max}
    //                       onChange={(event) => updateSettings(script, s, e, event.target.value)}
    //                     />
    //                   </div>
    //                 )}
    //                 {e.type === 'text' && (
    //                   <input
    //                     type="text"
    //                     value={e.value}
    //                     onChange={(event) => updateSettings(script, s, e, event.target.value)}
    //                   />
    //                 )}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   ))}
    // </div>
    // ))}
  );
}

export default Plugins;
