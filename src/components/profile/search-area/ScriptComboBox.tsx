import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {CloseButton, Combobox, Input, InputBase, useCombobox} from '@mantine/core';
import {useAppSelector} from "../../../store";

interface ScriptComboBoxProp {
    setScriptId: (id: string) => void;
    canClear: boolean;
}

const ScriptComboBox = forwardRef(function ScriptComboBox({setScriptId, canClear}: ScriptComboBoxProp, ref) {
    const listScripts = useAppSelector(state => state.script.listScripts);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        if (!canClear) {
            setValue(listScripts[0]?.name)
            setScriptId(listScripts[0]?.id)
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
        <Combobox.Option value={script.id} key={script.id} fw={700}>
            {script.name}
        </Combobox.Option>
    ));


    return (
        <Combobox
            store={combobox}
            withinPortal={true}
            onOptionSubmit={(id, options) => {
                setValue(options.children as string);
                setScriptId(id);
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
                                       onClick={() => {
                                           setValue(null)
                                           setScriptId(undefined)
                                       }}
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