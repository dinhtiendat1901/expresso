import {useEffect, useState} from 'react';
import {Combobox, Container, InputBase, useCombobox} from '@mantine/core';
import {useAppSelector} from "../../store";

interface ScriptComboBoxProp {
    setScriptPath: (path: string) => void;
}

export default function ScriptComboBox({setScriptPath}: ScriptComboBoxProp) {
    const listScripts = useAppSelector(state => state.script.listScripts);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [value, setValue] = useState<string | null>(null);
    useEffect(() => {
        setValue(listScripts[0]?.name)
        setScriptPath(listScripts[0]?.path)
    }, [listScripts]);

    const options = listScripts.map((script) => (
        <Combobox.Option value={script.path} key={script.id}>
            {script.name}
        </Combobox.Option>
    ));


    return (
        <Container w={370} p={0}>
            <Combobox store={combobox}
                      withinPortal={true}
                      onOptionSubmit={(path, options) => {
                          setValue(options.children as string);
                          setScriptPath(path);
                          combobox.closeDropdown();
                      }}>
                <Combobox.Target>
                    <InputBase component="button" radius='xl' size='xs'
                               type="button"
                               pointer
                               rightSection={<Combobox.Chevron/>}
                               onClick={() => combobox.toggleDropdown()}
                               rightSectionPointerEvents="none">
                        {value}
                    </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </Container>
    );
}