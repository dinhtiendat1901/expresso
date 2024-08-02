import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {CloseButton, Combobox, Input, InputBase, useCombobox} from '@mantine/core';
import {useAppSelector} from "../../store";

interface ScriptComboBoxProp {
    setScriptPath: (path: string) => void;
    canClear: boolean;
}

const ScriptComboBox = forwardRef(function ScriptComboBox({setScriptPath, canClear}: ScriptComboBoxProp, ref) {
    const listScripts = useAppSelector(state => state.script.listScripts);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        if (!canClear) {
            setValue(listScripts[0]?.name)
            setScriptPath(listScripts[0]?.path)
        }
    }, [listScripts]);

    useImperativeHandle(ref, () => {
        return {
            clear() {
                setValue(null)
            }
        };
    });

    const options = listScripts.map((script) => (
        <Combobox.Option value={script.path} key={script.id} fw={700}>
            {script.name}
        </Combobox.Option>
    ));


    return (
        <Combobox
            store={combobox}
            withinPortal={true}
            onOptionSubmit={(path, options) => {
                setValue(options.children as string);
                setScriptPath(path);
                combobox.closeDropdown();
            }}>

            <Combobox.Target>
                <InputBase label='Script'
                           component="button"
                           type="button"
                           pointer
                           rightSection={
                               value !== null ? (
                                   <CloseButton
                                       size="sm"
                                       onMouseDown={(event) => event.preventDefault()}
                                       onClick={() => setValue(null)}
                                       aria-label="Clear value"
                                   />) : (<Combobox.Chevron/>)
                           }
                           onClick={() => combobox.toggleDropdown()}
                           rightSectionPointerEvents={value === null ? 'none' : 'all'}>
                    {value || <Input.Placeholder fw={700}>Pick value</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
})

export default ScriptComboBox