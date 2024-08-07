import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Badge, CloseButton, Combobox, Input, InputBase, useCombobox} from '@mantine/core';
import {useAppSelector} from "../../../store";
import classes from '../../../css/BagdeLabel.module.css'

interface ScriptComboBoxProp {
    setGroupId: (id: string) => void;
    canClear: boolean;
}

const ProfileGroupComboBox = forwardRef(function ProfileGroupComboBox({
                                                                          setGroupId,
                                                                          canClear
                                                                      }: ScriptComboBoxProp, ref) {
    const listProfileGroups = useAppSelector(state => state.profileGroup.listProfileGroups);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        if (!canClear) {
            setValue(<Badge classNames={{
                label: classes.label
            }} color={listProfileGroups[0]?.color}>{listProfileGroups[0]?.name}</Badge>)
            setGroupId(listProfileGroups[0]?.id)
        }
    }, [listProfileGroups]);

    useImperativeHandle(ref, () => {
        return {
            clear() {
                setValue(null)
            }
        };
    });

    const options = listProfileGroups.map((profileGroup) => (
        <Combobox.Option value={profileGroup.id} key={profileGroup.id} fw={700}>
            <Badge classNames={{
                label: classes.label
            }} color={profileGroup.color}>{profileGroup.name}</Badge>
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            withinPortal={true}
            onOptionSubmit={(id, options) => {
                setValue(options.children);
                setGroupId(id);
                combobox.closeDropdown();
            }}>

            <Combobox.Target>
                <InputBase classNames={{input: classes.input}}
                           label='Group'
                           component="button"
                           type="button"
                           pointer
                           rightSection={
                               (value !== null) && canClear ? (
                                   <CloseButton
                                       size="sm"
                                       onMouseDown={(event) => event.preventDefault()}
                                       onClick={() => {
                                           setValue(null)
                                           setGroupId(undefined)
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

export default ProfileGroupComboBox