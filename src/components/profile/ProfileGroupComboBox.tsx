import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Badge, Combobox, InputBase, useCombobox} from '@mantine/core';
import {useAppSelector} from "../../store";
import classes from '../../css/BagdeLabel.module.css'

interface ScriptComboBoxProp {
    setProfileGroup: (id: string) => void;
    label: string | null;
    canClear: boolean;
}

const ProfileGroupComboBox = forwardRef(function ProfileGroupComboBox({
                                                                          setProfileGroup,
                                                                          label,
                                                                          canClear
                                                                      }: ScriptComboBoxProp, ref) {
    const listProfileGroups = useAppSelector(state => state.profileGroup.listProfileGroups);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [value, setValue] = useState(null);
    useEffect(() => {
        if (!canClear) {
            setValue(<Badge classNames={{
                label: classes.label
            }} color={listProfileGroups[0]?.color}>{listProfileGroups[0]?.name}</Badge>)
            setProfileGroup(listProfileGroups[0]?.id)
        } else {
            setValue(<Badge classNames={{
                label: classes.label
            }} color='dark'>All</Badge>)
            setProfileGroup(undefined)
        }
    }, [listProfileGroups]);
    useImperativeHandle(ref, () => {
        return {
            clear() {
                setValue(<Badge classNames={{
                    label: classes.label
                }} color='dark'>All</Badge>)
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

    if (canClear) {
        options.unshift(<Combobox.Option value={undefined} key='all' fw={700}>
            <Badge classNames={{
                label: classes.label
            }} color='dark'>All</Badge>
        </Combobox.Option>)
    }


    return (
        <>
            <Combobox store={combobox}
                      withinPortal={true}
                      onOptionSubmit={(id, options) => {
                          setValue(options.children);
                          setProfileGroup(id);
                          combobox.closeDropdown();
                      }}>
                <Combobox.Target>
                    <InputBase classNames={{
                        input: classes.input
                    }}
                               label={label}
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
})

export default ProfileGroupComboBox