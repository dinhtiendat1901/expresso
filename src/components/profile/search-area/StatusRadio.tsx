import {Group, Radio} from '@mantine/core';
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import classes from '../../../css/Label.module.css'

interface StatusRadioProp {
    setStatus: (status: number) => void;
    selectedScriptId: string
}

const StatusRadio = forwardRef(function StatusRadio({setStatus, selectedScriptId}: StatusRadioProp, ref) {
    const [value, setValue] = useState('');
    const [disableRadio, setDisableRadio] = useState(false);

    useEffect(() => {
        if (selectedScriptId) {
            setDisableRadio(false)
        } else {
            setDisableRadio(true)
        }

    }, [selectedScriptId]);

    useImperativeHandle(ref, () => {
        return {
            clear() {
                setValue('');
                setStatus(undefined);
            }
        };
    });

    function handleOnChange(value) {
        setValue(value)
        if (value) {
            if (value === '1') setStatus(1);
            if (value === '0') setStatus(0);
        } else setStatus(undefined);
    }

    return (
        <Radio.Group
            value={value}
            onChange={handleOnChange}
            label="Run Status"
            withAsterisk>
            <Group mt='xs'>
                <Radio value='' label="Not Run" disabled={disableRadio} classNames={{
                    label: classes.radio_label
                }}/>
                <Radio value='1' label="Run Success" disabled={disableRadio} classNames={{
                    label: classes.radio_label
                }}/>
                <Radio value='0' label="Run Fail" disabled={disableRadio} classNames={{
                    label: classes.radio_label
                }}/>
            </Group>
        </Radio.Group>
    )
})

export default StatusRadio