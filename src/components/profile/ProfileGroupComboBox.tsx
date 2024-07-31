import {useEffect, useState} from 'react';
import {Badge, Combobox, InputBase, useCombobox} from '@mantine/core';
import {useAppSelector} from "../../store";
import classes from '../../css/BagdeLabel.module.css'

interface ScriptComboBoxProp {
    setProfileGroup: (id: string) => void;
}

export default function ProfileGroupComboBox({setProfileGroup}: ScriptComboBoxProp) {
    const listProfileGroups = useAppSelector(state => state.profileGroup.listProfileGroups);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [value, setValue] = useState(null);
    useEffect(() => {
        setValue(<Badge classNames={{
            label: classes.label
        }} color={listProfileGroups[0]?.color}>{listProfileGroups[0]?.name}</Badge>)
        setProfileGroup(listProfileGroups[0]?.id)
    }, [listProfileGroups]);

    const options = listProfileGroups.map((profileGroup) => (
        <Combobox.Option value={profileGroup.id} key={profileGroup.id} fw={700}>
            <Badge classNames={{
                label: classes.label
            }} color={profileGroup.color}>{profileGroup.name}</Badge>
        </Combobox.Option>
    ));


    return (
        <>
            <Combobox store={combobox}
                      withinPortal={true}
                      onOptionSubmit={(id, options) => {
                          setValue(options.children as string);
                          setProfileGroup(id);
                          combobox.closeDropdown();
                      }}>
                <Combobox.Target>
                    <InputBase classNames={{
                        input: classes.input
                    }}
                               label='Profile Group'
                               component="button" fw={700}
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
        </>
    );
}